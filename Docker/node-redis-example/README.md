This is a slightly more complex example with node and redis.

The app counts how many visits the page has got.

Request -> Redis server -> Node app
Request -> Redis server balances -> 3 Node apps

Run this node-redis example with:

```sh
docker-compose up --build # first time
docker-compose up # every subsequent time
```
