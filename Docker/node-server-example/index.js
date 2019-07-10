const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from node docker example');
});

app.listen(8080, () => {
  console.log('This example is waiting for you on localhost:8080');
});
