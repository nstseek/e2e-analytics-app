import express, { Request } from 'express';
import knex from 'knex';
import tables from '../mapping/db_schema';
import Empresa from '../models/empresa';
import { db } from '../server';

const router = express.Router();

let dbCon: ReturnType<typeof knex>;

const routes = (db: typeof dbCon) => {
  dbCon = db;
  return router;
};

router.get(
  '',
  async (
    req: Request<
      any,
      Empresa[] | Empresa,
      null,
      { id: number; fornecedores: boolean }
    >,
    res
  ) => {
    try {
      let response: Empresa[] = [];
      if (req.query.fornecedores) {
        /* meter um 
          SELECT 
              *
          FROM
              REL_FORNECEDOR_EMPRESA
                  LEFT JOIN
              FORNECEDOR ON REL_FORNECEDOR_EMPRESA.FORNECEDOR_ID = FORNECEDOR.ID
                  LEFT JOIN
              EMPRESA ON REL_FORNECEDOR_EMPRESA.EMPRESA_ID = EMPRESA.ID;
              usando knex aq e instanciar os models depois cada um pegando suas prop
              ESQUECE O LEFT JOIN, ELE VAI REPETIR EMPRESAS SE TIVER 1 EMPRESA COM 2 FORNECEDORES, FAZ UMA 2 QUERY USANDO O ID DA EMPRESA MESMO
        */
      } else {
        if (req.query.id) {
          response = await db
            .select<Empresa[]>('*')
            .from('' + tables.Empresa)
            .where({ id: req.query.id });
        } else {
          response = await db.select('*').from('' + tables.Empresa);
        }
        res.json(response.length === 1 ? response[0] : response);
      }
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
);
router.post('*', (_req, res) => {
  res.send('post empresa ok');
});
router.put('*', (_req, res) => {
  res.send('put empresa ok');
});
router.delete('*', (_req, res) => {
  res.send('delete empresa ok');
});

export default routes;
