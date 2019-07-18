Docker example of a super simple node app.
It's just a hello world app on '/' route.

Run this node server example with:

```sh
docker build -t node-server . # <- that dot "." is important.
# It tells docker that the Dockerfile is in the current directory

# Map port 5000 on your host (laptop, cloud, server, wherever) to 8080 in container
docker run node-server -p 5000:8080
```
