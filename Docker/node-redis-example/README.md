This is a slightly more complex example with node and redis.

Request -> Redis server -> Node app
Request -> Redis server balances -> 3 Node apps

Run this node-redis example with:

```sh
docker build -t node-redis . # <- that dot "." is important.
# It tells docker that the Dockerfile is in the current directory
docker run node-redis -p 8081:8081
# you can do 80:80 be explicit
```
