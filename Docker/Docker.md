# Docker Cheat Sheet

Tip: if ctrl+c doesn't work, try ctrl+d or type `exit`

## Docker containers CRUD

```sh
# CREATE
docker create hello-world
# get a guid that is the container's id

# START
docker start -a <container-id>

# RUN
# docker run = docker create + docker start
docker run <image-name> <command>
docker run hello-world echo 'Hello World!'
docker run hello-world ls # will print all the files inside container
# Run with a shell access
docker run -it <image-name> sh
# -i, --interactive - keep STDIN open even if not attached
# -t, --tty - Allocate a pseudo-TTY

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

## When docker is up

```sh
# Execute commands in running containers
docker exec -it <container-id> <command>
# -i, --interactive - keep STDIN open even if not attached
# -t, --tty - Allocate a pseudo-TTY

# get terminal access in the container
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
# Use CMD to execute a command on start of a container built from this image
CMD ["redis-cli"]
```
