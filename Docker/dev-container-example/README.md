This is a fullstack app example that uses docker in production.

This example uses two containers:

- dev container `dev.Dockerfile` - it is not `.dev` for intellisense reasons.
- prod container

```sh
docker build -f dev.Dockerfile .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image-id>
```
