const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const envVariables = require('./envVariables');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
  user: envVariables.pgUser,
  host: envVariables.phHost,
  database: envVariables.pgDatabase,
  password: envVariables.pgPassword,
  port: envVariables.pgPort
});

pgClient.on('error', () => console.log('Lost Postgres connection...'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(error => console.log('Could not create table...', error));
