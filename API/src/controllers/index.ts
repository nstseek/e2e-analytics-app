import express from 'express';
import empresa from './empresa';
import fornecedor from './fornecedor';
import uf from './uf';
import knex from 'knex';

const routes = (db: ReturnType<typeof knex>) => {
  const router = express.Router();
  router.use('/empresa', empresa(db));
  router.use('/fornecedor', fornecedor(db));
  router.use('/uf', uf(db));
  return router;
};

export default routes;
