# Docker Cheat Sheet

Tip: if ctrl+c doesn't work, try ctrl+d or type `exit`
For any shell commands not explained here, please refer to [explainshell](https://explainshell.com/)

## Docker containers CRUD

Feel free to use [`node-server-example`](./node-server-example) for reference

```sh
# CREATE
docker create hello-world
# get a guid that is the container's id

# START
docker start -a <container-id> # -a is --attach

# RUN
# docker run = docker create + docker start
docker run <image-name> <command>
docker run hello-world echo 'Hello World!'
docker run hello-world ls # will print all the files inside container

# Run with a shell access
docker run -it <image-name> sh
# -i, --interactive - keep STDIN open even if not attached
# -t, --tty - Allocate a pseudo-TTY

# Run and map host port to container port
docker run -p 8080:5000
# Left Host; Right Container

# LIST
docker ps # show running containers
docker ps --all # show all containers

# ACCESSING LOGS
docker logs <container-id>

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

## `docker-compose`

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
  redis: # first service - kind of like container
    image: 'redis' # based on this image
  node-redis: # second service
    build: . # based on docker file
    ports:
      - '5001:8081'
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

## Docker volumes

Feel free to use [`fullstack-example`](./fullstack-example) for reference
