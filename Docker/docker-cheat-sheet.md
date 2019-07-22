# Docker and `docker-compose` cheat sheet

Tip: if ctrl+c doesn't work, try ctrl+d or type `exit`
For any shell commands not explained here, please refer to [explainshell](https://explainshell.com/)

## Docker containers CRUD

Feel free to use [`node-server-example`](./node-server-example) for reference

```sh
# CREATE
docker create hello-world
# you will now receive a guid that is the container's id

# START
docker start -a <image-id> # -a, --attach

# RUN
# docker run = docker create + docker start
docker run <image-name> <command>
# imagine we have a hello-world image
docker run hello-world echo 'Hello World!'
docker run hello-world ls # will print all the files inside container

# Run with a shell access
docker run -it <image-name> sh
# -i, --interactive - keep STDIN open even if not attached
# -t, --tty - Allocate a pseudo-TTY

# Run and map host port to container port
docker run -p 8080:5000 <image-id> # -p, --publish
# Left Host; Right Container

# LIST
docker ps # show running containers
docker ps --all # show all containers

# ACCESSING LOGS
docker logs <container-id>

# Copy logs to your local machine
# Docker merges stdout and stderr for us, we can treat the log output like any other shell stream.
docker logs <container-id/name> > myservice.log

# Send logs and then any updates that follow
docker logs -f <container-id/name> > myservice.log # -f = --follow

# Send logs, any updates that follow AND view it all at the same time!
docker logs -f <container-id/name> | tee myservice.log # https://explainshell.com/explain?cmd=tee
# For why we use '|' instead of '>', see https://askubuntu.com/a/172989

# STOP
docker stop <container-id> #SIGTERM is issued, so it takes it's time to shut down.
docker kill <container-id> #SIGKILL - you knows what happens.

# CLEAN UP
# Cleans stopped containers (and a few more bits)
docker system prune
```

## When docker container is up

```sh
# Run commands in running containers
docker exec -it <container-id> <command>
# -i, --interactive - keep STDIN open even if not attached
# -t, --tty - Allocate a pseudo-TTY

# Access terminal in a running container
docker exec -it <container-id> sh
# bash, zsh, powershell are also possible
```

## Docker images with `Dockerfile`

### Docker image workflow

`Dockerfile` -> Docker Client -> Docker Server -> Image

Create `Dockerfile`

```Dockerfile
# Use FROM to choose a base image
FROM alpine

# Use RUN to execute commands to prepare the image
RUN apk add --update redis

# Specifying working directory
WORKDIR /usr/app

# Use COPY to copy files/folders into container
# COPY <source> <destination>
COPY . .
# from current folder in source to default in destination

# Copy miltiple files, destination in this case MUST end with / or \
COPY ./package.json ./package-lock.json ./

# Set an environment variable
ENV CI=true # Consider using .env files instead

# Use EXPOSE to expose ports for incoming traffic
EXPOSE 80

# Use CMD to execute a command on start of a container built from this image
CMD ["redis-cli"]
```

Build and run an image from `Dockerfile`

```sh
docker build . # Fullstop "." refers to the build context - current directory

# Run a specific Dockerfile
docker build -f Dockerfile.dev . # <- don't forget the fullstop
```

Tag an image

```sh
# Remembering IDs are a pain. Tag images to use names to run containers.
docker build -t alanmynah/redis:latest # technically, only ":latest" is a tag.
#               dockerId/imgname:version
```

Run an image

```sh
# run your image
docker run alanmynah/redis:latest
# Equivalent to
docker run alanmynah/redis # :latest tag is run by default, so can be omitted
```

### Multistep `Dockerfile`

```Dockerfile
# as <name-of-step> is a way to split Dockerfile config.
FROM node:alpine as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
# --from=<name-of-step> to reuse results of a previously specified step
COPY --from=build /app/build /usr/share/nginx/html
# nginx image includes start commands, so we can skip it
```

To run `Dockerfile` above, use the below commands:

```sh
docker build .
# Get <image-id>
# Default nginx port is 80
docker run -p 8080:80 <image-id>
```

## Docker volumes

Feel free to use [`dev-prod-container-example`](./dev-prod-container-example) for reference

When running a container, you might want to have changes made on your machine to be reflected in a container. That's when `volumes` come to the rescue.

Also remember that volume binding is bidirectional. Whatever changes in the docker container will also be changed on your local machine.

```sh
# Map a current working directory (pwd) to /app folder in a container
docker run -v $(pwd):/app <image-id> # -v, --volume

# Create a placeholder for future mapping
# aka 'Bookmarking (or binding) volumes'
docker run -v /app/node_modules <image-id>
# Q: When can this be useful?
# A: Whenever your code relies on something generated at build time.
# For example, at git clone. You haven't ran 'npm i' yet to copy over node_modules
# As if saying: "I know node_modules isn't there yet, but it will be, so map it"

# Combine the two ways to bookmark volumes
# The order is not important
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image-id>
```

If all of this seems like a pain, yes, [there is a better way using `docker-compose`](https://github.com/alanmynah/cheat-sheets/blob/master/Docker/docker-cheat-sheet.md#volume-binding-with-docker-compose)

# `docker-compose`

Feel free to use [`node-redis-example`](./node-redis-example) for reference

When running `docker cli` commands gets tedious, `docker-compose` comes to the rescue.

[Refer to node-redis-example](./node-redis-example)

When writing `docker-compose.yml`, the best way to think about it is by asking yourself "What `docker cli` commands do I need to run for each container?".

```sh
touch docker-compose.yml # create docker-compose config file
```

Example of `docker-compose.yml` file:

```yml
version: '3' # Version of docker-compose to use

# 'services' specify configuration for all the containers that need to be run
services:
  backend: # first service - kind of like container
    image: 'my-backend-image' # based on this image
    container_name: crud_api # assign this name to the container
  node-redis: # second service
    build:
      context: . # current working directory
      dockerfile: dev.Dockerfile # Optional, if uses default Dockerfile
    ports:
      - 5001:8081 # docker run -p 5001:8081 <image-id>
    command: ['redis-cli'] # docker exec <container-id> npm run test
```

`docker-compose` up and down and status

```sh
# Build containers and run them
docker-compose up --build

# Run already built containers
docker-compose up

# Run containers without attaching to them
# i.e. in 'detached' (sometimes refered to as 'daemon' (background) mode)
docke-compose up -d

# Stop containers
docker-compose down

# Get status
docker-compose ps
```

## Restart policies

Ways to improve failure resilience is to specify a restart policy.

```yml
services:
...
  node-redis:
    ...
    restart: unless-stopped
    ...
```

```yml
services:
...
  node-redis:
    ...
    # note that if you specify "no", it has to be in quotes
    restart: "no"
    ...
```

Possible options include:

```txt
no
always
on-failure
unless-stopped
```

## Volume binding with `docker-compose`

If you wish to know about volume binding, please refer to [Docker volumes section](https://github.com/alanmynah/cheat-sheets/blob/master/Docker/docker-cheat-sheet.md#docker-volumes)

```yml
version: '3'
services:
  frontend:
    volumes:
      - /app/node_modules # docker run -v /app/node_modules
      - .:/app # equal to docker run -v $(pwd):/app
```
