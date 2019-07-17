const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379 // yes, it's the default port - so good to know, just in case
});
redisClient.set('visits', 0);

app.get('/', (req, res) => {
  redisClient.get('visits', (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    redisClient.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Node-redis-example is waiting for you on localhost:8081');
});
