import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import knex from 'knex';
import routes from './controllers/';

export function log(...args: string[]) {
  console.log(
    chalk.bold(chalk.gray(`[${new Date().toISOString()}]:`)),
    ...args
  );
}

log(chalk.blueBright('Starting server...'));

log(chalk.yellow('Connecting to database...'));
export const db = knex({
  connection: {
    host: 'sql255.main-hosting.eu',
    user: 'u514786799_e2euser',
    password: process.env.SQLPASSWORD,
    database: 'u514786799_e2eapp'
  },
  client: 'mysql'
} as knex.Config);
log(chalk.yellow('Database connected.'));

const port = process.env.PORT || 4000;

log(chalk.blue('Creating express instance...'));

const server = express();

log(chalk.blue('Express instantiated.'));

server.use((req, res, next) => {
  let color = chalk.blue;
  if (res.statusCode >= 200 && res.statusCode < 300) {
    color = chalk.green;
  } else if (res.statusCode >= 300 && res.statusCode < 400) {
    color = chalk.yellow;
  } else if (res.statusCode >= 400) {
    color = chalk.red;
  }
  log(
    color(`${res.statusCode} ${res.statusMessage}`),
    chalk.white(`| IP ${req.ip} ${req.method} ${req.path}`)
  );
  next();
});

server.use(cors());

server.use(express.json());

server.use(routes(db));

const listener = server.listen(port, () => {
  const address = listener.address() as any;
  log(
    chalk.green('Server listening on ' + address.address + ':' + address.port)
  );
});
