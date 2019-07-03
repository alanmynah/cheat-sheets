# Docker Cheat Sheet

```sh
# Create
docker create hello-world
# get the container guid

# Start
docker start -a <container-guid>

# Run
# docker run = docker create + docker start
docker run <image-name> <command>
docker run hello-world echo 'Hello World!'
docker run hello-world ls # will print all the files inside container

# List
docker ps # show running containers
docker ps --all # show all containers

# Clean up stopped containers (and a few more bits)
docker system prune
```
