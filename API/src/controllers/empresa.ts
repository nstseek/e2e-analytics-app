import express, { Request } from 'express';
import knex, { Transaction } from 'knex';
import tables from '../mapping/db_schema';
import Empresa from '../models/empresa';
import Fornecedor from '../models/fornecedor';
import RelFornecedorEmpresa from '../models/relFornecedorEmpresa';
import _ from 'lodash';
import { autoMapper } from '../utils/automapper';

const routes = (db: ReturnType<typeof knex>) => {
  const router = express.Router();

  router.get(
    '',
    async (
      req: Request<
        any,
        Empresa[] | Empresa,
        null,
        { id: number; fornecedores: 'true' | 'false' }
      >,
      res
    ) => {
      try {
        let response: Empresa[] = [];
        let empresas: Empresa[] = [];
        if (req.query.id) {
          response = await db
            .select<Empresa[]>('*')
            .from('' + tables.Empresa)
            .where({ id: req.query.id });
        } else {
          response = await db.select('*').from('' + tables.Empresa);
        }
        if (req.query.fornecedores === 'true') {
          for (let empresa of response) {
            empresa = new Empresa(empresa, null, true);
            const fornecedores = await db
              .select<Fornecedor[]>('*')
              .from('' + tables.RelFornecedorEmpresa)
              .leftJoin(
                '' + tables.Fornecedor,
                tables.RelFornecedorEmpresa +
                  '.' +
                  tables.RelFornecedorEmpresa.fornecedor_id,
                tables.Fornecedor + '.' + tables.Fornecedor.id
              )
              .where(tables.RelFornecedorEmpresa.empresa_id, empresa.id);
            empresas.push(new Empresa(empresa, fornecedores, false, true));
          }
        } else {
          empresas = response.map(
            (empresa) => new Empresa(empresa, null, true)
          );
        }
        res.json(empresas.length === 1 ? empresas[0] : empresas);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.post(
    '*',
    async (
      req: Request<any, Empresa[] | Empresa, Empresa[] | Empresa, never>,
      res
    ) => {
      const insertEmpresa = async (
        body: Empresa,
        ctx: Transaction | typeof db = db
      ) => {
        if (body.fornecedores) {
          await ctx.transaction(async (trx) => {
            const body_NoRelation: Empresa = _.cloneDeep(body);
            body_NoRelation.fornecedores = null;
            delete body_NoRelation.fornecedores;
            const empresa = await insertEmpresa(body_NoRelation, trx);
            const fornecedoresIds: number[] = [];
            for (let fornecedor of body.fornecedores) {
              fornecedor = new Fornecedor(fornecedor, null, false, false, true);
              const fornecedorId = await trx
                .insert(fornecedor)
                .into('' + tables.Fornecedor);
              fornecedoresIds.push(fornecedorId[0]);
            }
            for (const fornecedorId of fornecedoresIds) {
              const obj: RelFornecedorEmpresa = {
                empresa_id: empresa.id,
                fornecedor_id: fornecedorId
              };
              await trx.insert(obj).into('' + tables.RelFornecedorEmpresa);
            }
          });
        } else {
          const obj = new Empresa(body, null, false, false, true);
          const id = await ctx.insert(obj, '' as '*').into('' + tables.Empresa);
          obj.id = id[0];
          return obj;
        }
      };
      try {
        if (Array.isArray(req.body)) {
          // typescript didn't get that req.body must be an array to be here
          req.body = req.body as Empresa[];
          for (const empresa of req.body) {
            await insertEmpresa(empresa);
          }
          res.send(req.body);
        } else {
          res.send(await insertEmpresa(req.body));
        }
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.put(
    '*',
    async (req: Request<any, Empresa, Empresa, { id: number }>, res) => {
      const updateEmpresa = async (
        body: Empresa,
        ctx: (typeof db & Transaction) | typeof db = db
      ) => {
        if (body.fornecedores) {
          await ctx.transaction(async (trx) => {
            const fornecedoresRel = await trx
              .select<RelFornecedorEmpresa[]>('*')
              .from('' + tables.RelFornecedorEmpresa)
              .where(tables.RelFornecedorEmpresa.empresa_id, req.query.id);
            fornecedoresRel.forEach((fornecRel) =>
              autoMapper(fornecRel, fornecRel, true)
            );
            for (const fornecedorRel of fornecedoresRel) {
              if (
                body.fornecedores.findIndex(
                  (fornecedor) => fornecedorRel.fornecedor_id === fornecedor.id
                ) === -1
              ) {
                await trx('' + tables.RelFornecedorEmpresa)
                  .where({
                    empresa_id: req.query.id,
                    fornecedor_id: fornecedorRel.fornecedor_id
                  })
                  .del();
              }
            }
            for (const fornecedorRel of fornecedoresRel) {
              const fornecedor = body.fornecedores.find(
                (fornecedor) => fornecedorRel.fornecedor_id === fornecedor.id
              );
              if (fornecedor) {
                await trx('' + tables.Fornecedor)
                  .where({ id: fornecedor.id })
                  .update(new Fornecedor(fornecedor, null, false, false, true));
              }
            }
            for (const fornecedor of body.fornecedores) {
              if (fornecedor.id === undefined) {
                const id = await ctx
                  .insert(new Fornecedor(fornecedor, null, false, false, true))
                  .into('' + tables.Fornecedor);
                const obj: RelFornecedorEmpresa = {
                  empresa_id: req.query.id,
                  fornecedor_id: id[0]
                };
                await ctx.insert(obj).into('' + tables.RelFornecedorEmpresa);
              }
            }
          });
        } else {
          const obj = new Empresa(body, null, false, false, true);
          await ctx('' + tables.Empresa)
            .where({ id: req.query.id })
            .update(obj);

          obj.id = Number(req.query.id);
          return obj;
        }
      };
      try {
        res.send(await updateEmpresa(req.body));
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
            empresa_id: req.query.id
          };
          await trx('' + tables.RelFornecedorEmpresa)
            .where(obj)
            .del();
          await trx('' + tables.Empresa)
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
