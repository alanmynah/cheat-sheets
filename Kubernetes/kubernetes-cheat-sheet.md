# Kubernetes cheat-sheet

## `apiVersion`

![image](https://user-images.githubusercontent.com/26703675/62350427-9a983200-b4fa-11e9-847b-d5b660329d3d.png)

## `kind`

### Pod

Think of a pod as minimal required wrapper around a container or a set of tightly coupled containers.

### Service

There are 4 types of services:

- ClusterIP
- NodePort - a service that exposes a container to the ourside world. Really is a dev only service.
- LoadBalancer
- Ingress

## Linking pods and services

Inside a pod config you can use `labels` property inside `metadata`, that can then be linked to in a service config via `selector` property using the same label.

Example:

```yml
# inside pod config
metadata:
  labels:
    some-way-to: link-my-app # foo bar baz naming, don't use in prod
    component: web # more human friendly naming
# inside service config
spec:
  selector:
    some-way-to: link-my-app
    component: web
```
