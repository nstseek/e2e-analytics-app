import express, { Request } from 'express';
import knex, { Transaction } from 'knex';
import _ from 'lodash';
import tables from '../mapping/db_schema';
import Empresa from '../models/empresa';
import Fornecedor from '../models/fornecedor';
import RelFornecedorEmpresa from '../models/relFornecedorEmpresa';
import { autoMapper } from '../utils/automapper';

const routes = (db: ReturnType<typeof knex>) => {
  const router = express.Router();

  router.get(
    '',
    async (
      req: Request<
        any,
        Fornecedor[] | Fornecedor,
        null,
        { id: number; empresas: 'true' | 'false' }
      >,
      res
    ) => {
      try {
        let response: Fornecedor[] = [];
        let fornecedores: Fornecedor[] = [];
        if (req.query.id) {
          response = await db
            .select<Fornecedor[]>('*')
            .from('' + tables.Fornecedor)
            .where({ id: req.query.id });
        } else {
          response = await db.select('*').from('' + tables.Fornecedor);
        }
        if (req.query.empresas === 'true') {
          for (let fornecedor of response) {
            fornecedor = new Fornecedor(fornecedor, null, true);
            const empresas = await db
              .select<Empresa[]>('*')
              .from('' + tables.RelFornecedorEmpresa)
              .leftJoin(
                '' + tables.Empresa,
                tables.RelFornecedorEmpresa +
                  '.' +
                  tables.RelFornecedorEmpresa.empresa_id,
                tables.Empresa + '.' + tables.Empresa.id
              )
              .where(tables.RelFornecedorEmpresa.fornecedor_id, fornecedor.id);
            fornecedores.push(
              new Fornecedor(fornecedor, empresas, false, true)
            );
          }
        } else {
          fornecedores = response.map((empresa) => new Fornecedor(empresa));
        }
        res.json(fornecedores.length === 1 ? fornecedores[0] : fornecedores);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.post(
    '*',
    async (
      req: Request<
        any,
        Fornecedor[] | Fornecedor,
        Fornecedor[] | Fornecedor,
        never
      >,
      res
    ) => {
      const insertFornecedor = async (
        body: Fornecedor,
        ctx: Transaction | typeof db = db
      ) => {
        if (body.empresas) {
          await ctx.transaction(async (trx) => {
            const body_NoRelation: Fornecedor = _.cloneDeep(body);
            body_NoRelation.empresas = null;
            delete body_NoRelation.empresas;
            const fornecedor = await insertFornecedor(body_NoRelation, trx);
            const empresasIds: number[] = [];
            for (let empresa of body.empresas) {
              empresa = new Empresa(empresa, null, false, false, true);
              const empresaId = await trx
                .insert(empresa)
                .into('' + tables.Empresa);
              empresasIds.push(empresaId[0]);
            }
            for (const empresaId of empresasIds) {
              const obj: RelFornecedorEmpresa = {
                empresa_id: empresaId,
                fornecedor_id: fornecedor.id
              };
              await trx.insert(obj).into('' + tables.RelFornecedorEmpresa);
            }
          });
        } else {
          const obj = new Fornecedor(body, null, false, false, true);
          const id = await ctx
            .insert(obj, '' as '*')
            .into('' + tables.Fornecedor);
          obj.id = id[0];
          return obj;
        }
      };
      try {
        if (Array.isArray(req.body)) {
          // typescript didn't get that req.body must be an array to be here
          req.body = req.body as Fornecedor[];
          for (const fornecedor of req.body) {
            await insertFornecedor(fornecedor);
          }
          res.send(req.body);
        } else {
          res.send(await insertFornecedor(req.body));
        }
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.put(
    '*',
    async (req: Request<any, Fornecedor, Fornecedor, { id: number }>, res) => {
      const updateFornecedor = async (
        body: Fornecedor,
        ctx: (typeof db & Transaction) | typeof db = db
      ) => {
        if (body.empresas) {
          await ctx.transaction(async (trx) => {
            const empresasRel = await trx
              .select<RelFornecedorEmpresa[]>('*')
              .from('' + tables.RelFornecedorEmpresa)
              .where(tables.RelFornecedorEmpresa.fornecedor_id, req.query.id);
            empresasRel.forEach((empresaRel) =>
              autoMapper(empresaRel, empresaRel, true)
            );
            for (const empresaRel of empresasRel) {
              if (
                body.empresas.findIndex(
                  (empresa) => empresaRel.empresa_id === empresa.id
                ) === -1
              ) {
                await trx('' + tables.RelFornecedorEmpresa)
                  .where({
                    empresa_id: empresaRel.empresa_id,
                    fornecedor_id: req.query.id
                  })
                  .del();
              }
            }
            for (const empresaRel of empresasRel) {
              const empresa = body.empresas.find(
                (empresa) => empresaRel.empresa_id === empresa.id
              );
              if (empresa) {
                await trx('' + tables.Empresa)
                  .where({ id: empresa.id })
                  .update(new Empresa(empresa, null, false, false, true));
              }
            }
            for (const empresa of body.empresas) {
              if (empresa.id === undefined) {
                const id = await ctx
                  .insert(new Empresa(empresa, null, false, false, true))
                  .into('' + tables.Empresa);
                const obj: RelFornecedorEmpresa = {
                  empresa_id: id[0],
                  fornecedor_id: req.query.id
                };
                await ctx.insert(obj).into('' + tables.RelFornecedorEmpresa);
              }
            }
          });
        } else {
          const obj = new Fornecedor(body, null, false, false, true);
          await ctx('' + tables.Fornecedor)
            .where({ id: req.query.id })
            .update(obj);

          obj.id = Number(req.query.id);
          return obj;
        }
      };
      try {
        res.send(await updateFornecedor(req.body));
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.delete(
    '*',
    async (req: Request<any, string, never, { id: number }>, res) => {
      if (!req.query.id) {
        res.status(400);
        res.send('ID inválido');
      }
      try {
        await db.transaction(async (trx) => {
          const obj: Partial<RelFornecedorEmpresa> = {
            fornecedor_id: req.query.id
          };
          await trx('' + tables.RelFornecedorEmpresa)
            .where(obj)
            .del();
          await trx('' + tables.Fornecedor)
            .where({ id: req.query.id })
            .del();
        });
        res.send(req.query.id + ' deleted');
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );

  return router;
};

export default routes;
