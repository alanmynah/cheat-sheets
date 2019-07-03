# Docker Cheat Sheet

## Docker CRUD

```sh
# Create
docker create hello-world
# get a guid that is the container's id

# Start
docker start -a <container-id>

# Run
# docker run = docker create + docker start
docker run <image-name> <command>
docker run hello-world echo 'Hello World!'
docker run hello-world ls # will print all the files inside container

# List
docker ps # show running containers
docker ps --all # show all containers

# Accessing logs
docker logs <container-id>

# Stop a container
docker stop <container-id> #SIGTERM is issued, so it takes it's time to shut down.
docker kill <container-id> #SIGKILL - you knows what happens.

# Clean up stopped containers (and a few more bits)
docker system prune
```

## When docker is up

```sh
# Execute commands in running containers
docker exec -it <container-id> <command> #

```
