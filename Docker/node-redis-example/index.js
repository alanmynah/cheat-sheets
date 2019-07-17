const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const redisClient = redis.createClient({
  // the hostname is resolved by docker
  host: 'redis-server', // you can find it specified in docker-compose.yml
  port: 6379 // yes, it's the default port - good to know, just in case
});
redisClient.set('visits', 0);

app.get('/', (req, res) => {
  redisClient.get('visits', (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    redisClient.set('visits', parseInt(visits) + 1);
  });
});

app.get('/error', (req, res) => {
  // Check out the restart policies in the cheat sheet.
  res.send(`Just stopped node-server container. Check with 'docker ps'`);
  process.exit(1);
});

app.listen(8081, () => {
  console.log('Node-redis-example is waiting for you on localhost:5001');
});
