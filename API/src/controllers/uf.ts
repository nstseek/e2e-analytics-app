import express, { Request } from 'express';
import knex from 'knex';
import tables from '../mapping/db_schema';
import UF from '../models/uf';

const routes = (db: ReturnType<typeof knex>) => {
  const router = express.Router();

  router.get(
    '',
    async (req: Request<any, UF[] | UF, null, { id: number }>, res) => {
      try {
        let response: UF[] = [];
        if (req.query.id) {
          response = await db
            .select<UF[]>('*')
            .from('' + tables.UF)
            .where({ id: req.query.id });
        } else {
          response = await db
            .select('*')
            .from('' + tables.UF)
            .orderBy(tables.UF.nome);
        }
        res.json(response.length === 1 ? response[0] : response);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.post('', async (req: Request<any, UF, UF, {}>, res) => {
    try {
      const obj = new UF(req.body);
      const id = await db.insert(obj).into('' + tables.UF);
      obj.id = id[0];
      res.json(obj);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });
  router.put(
    '',
    async (req: Request<any, UF | string, UF, { id: number }>, res) => {
      if (!req.query.id) {
        res.status(400);
        res.send('ID inválido');
        return;
      }
      if (!req.body) {
        res.status(400);
        res.send('Body inválido');
        return;
      }
      delete req.body.id;
      try {
        const obj = new UF(req.body);
        await db('' + tables.UF)
          .where({ id: req.query.id })
          .update(new UF(req.body));
        obj.id = Number(req.query.id);
        res.json(obj);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
  );
  router.delete(
    '',
    async (req: Request<any, string, never, { id: number }>, res) => {
      if (!req.query.id) {
        res.status(400);
        res.send('ID inválido');
        return;
      }
      try {
        await db('' + tables.UF)
          .where({ id: req.query.id })
          .del();
        res.send();
      } catch (error) {
        res.status(500);
        res.send(error);
      }
      res.send();
    }
  );

  return router;
};

export default routes;
