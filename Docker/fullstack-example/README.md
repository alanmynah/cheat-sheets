This is a fullstack app example that uses docker in production.

This example uses two containers:

- dev container `dev.Dockerfile` - it is not `.dev` for intellisense reasons.
- prod container

```sh
docker build -f dev.Dockerfile .
docker start -a <container-id>
```
