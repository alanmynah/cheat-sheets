Run this node server example with:

```sh
docker build -t node-example . # <- that dot "." is important.
# It tells docker that the Dockerfile is in the current directory
docker run node-example -p 8080:8080
# you can do 80:80 be explicit
```
