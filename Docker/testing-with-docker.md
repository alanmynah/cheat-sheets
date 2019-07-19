# A guide to testing with docker

## Examples

[`dev-container-example`](./dev-container-example)

### A quick and easy way to run tests in a container

Just attach to the container and execute tests

```sh
docker exec -it <container-id> npm run test
```

### A more sustainable long-term solution

Create a separate `tests` service

```yml
version: '3'
services:
  frontend: ...
  tests:
    build:
      context: .
      dockerfile: dev.Dockerfile
    container_name: tests
    volumes:
      - /app/node_modules
      - .:/app
    command: ['npm', 'run', 'test']
```

Keep the below in mind when giving custom names to containers:

```txt
Because Docker container names must be unique, you cannot scale a service beyond 1 container if you have specified a custom name. Attempting to do so results in an error.

Note: This option is ignored when deploying a stack in swarm mode with a (version 3) Compose file.
```
