import express from 'express';
import empresa from './empresa';
import fornecedor from './fornecedor';
import uf from './uf';
import knex from 'knex';

const router = express.Router();

let dbCon: ReturnType<typeof knex>;

const routes = (db: typeof dbCon) => {
  dbCon = db;
  return router;
};

router.use('/empresa', empresa(dbCon));
router.use('/fornecedor', fornecedor(dbCon));
router.use('/uf', uf(dbCon));


export default routes;
