const redis = require('redis');

const envVariables = require('./envVariables');

const redisClient = redis.createClient({
  host: envVariables.redisHost,
  port: envVariables.redisPort,
  retry_strategy: () => 1000
});
const subscription = redisClient.duplicate();

function fibonacci(index) {
  if (index < 2) return 1;
  return fibonacci(index - 1) + fibonacci(index - 2);
}

subscription.on('message', (channel, message) => {
  redisClient.hset('values', message, fibonacci(parseInt(message)));
});
subscription.subscribe('insert');
