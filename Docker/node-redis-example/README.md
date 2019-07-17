This is a slightly more complex example with node and redis.

Request -> Redis server -> Node app
Request -> Redis server balances -> 3 Node apps

Run this node-redis example with:

```sh
docker-compose up --build # first time
docker-compose up # every subsequent time
```
