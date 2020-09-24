import express from 'express';
import knex from 'knex';

const router = express.Router();

let dbCon: ReturnType<typeof knex>;

const routes = (db: typeof dbCon) => {
  dbCon = db;
  return router;
}

router.get('', (_req, res) => {
  res.send('get fornecedor ok');
});
router.post('', (_req, res) => {
  res.send('post fornecedor ok');
});
router.put('', (_req, res) => {
  res.send('put fornecedor ok');
});
router.delete('', (_req, res) => {
  res.send('delete fornecedor ok');
});

export default routes;
