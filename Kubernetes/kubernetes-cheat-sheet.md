# Kubernetes cheat-sheet

## `apiVersion`

`apiVersion` usually depends on the `kind` that you're using, [more details](https://matthewpalmer.net/kubernetes-app-developer/articles/kubernetes-apiversion-definition-guide.html).

![image](https://user-images.githubusercontent.com/26703675/62350427-9a983200-b4fa-11e9-847b-d5b660329d3d.png)

## `kind`

### Pod

Think of a pod as minimal required wrapper around a container or a set of tightly coupled containers. `Pod`s on their own are a bit too basic for prod and are mainly used in dev environments:

- runs a single set of containers
- good for one-off dev workload
- not used (maybe, but rarely) in prod

### Deployment

Is the next evolution of a `Pod`. It runs one or more `Pod`s and provides updates and monitoring. `Deployment` is good for both dev and prod.

Deployments have `Pod Tepmplate`s, that specify the configuration that requires to be maintained.

See `template` section [in this yml for example](./k8s/client-deployment.yml)

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

## Running those .yml configs

```sh
kubectl --help # just to check things are installed

# POST
kubectl apply -f ./k8s/client-pod.yml
kubectl apply -f ./k8s/client-deployment.yml
kubectl apply -f ./k8s/client-node-port.yml

# GET
kubectl get pods
kubectl get deployments
kubectl get services

# DELETE
kubectl delete -f ./k8s/client-pod.yml
kubectl delete -f ./k8s/client-deployment.yml
kubectl delete -f ./k8s/client-node-port.yml

# Update a property in the deployed configuration
#  these all correspond the properties inside client-deployment.yml
kubectl set image deployment/client-deployment client=container-repo/container-image:tag
```

## Prod Example

For an example production application, see [multi-container example](./k8s/multi-container-prod-example/README.md)

![image](https://user-images.githubusercontent.com/26703675/112748181-0e316180-8fb2-11eb-93e6-021b553e2471.png)


