const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');

const envVariables = require('./envVariables');

// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres setup
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

// Redis setup
const redisClient = redis.createClient({
  host: envVariables.redisHost,
  port: envVariables.redisHost,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.get('/values/current', (req, res) => {
  // redis client doesn't support async/await
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('values', (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(422).send('Index is too high');
  }

  redisClient.hset('values', index, 'Calculating...');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log('Listening on port 5000');
});
