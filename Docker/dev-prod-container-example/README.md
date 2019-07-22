This is an example React app for the following scenarios:

- dev container `dev.Dockerfile` - it is not `.dev` for intellisense reasons.
- prod container `Dockerfile` that uses multistep build to serve the app with nginx

Dev docker

```sh
docker-compose run --build
```

Prod docker

```sh
docker build . # Сopy <image-id>
# Default nginx port is 80
docker run -p 8080:80 <image-id>
```
