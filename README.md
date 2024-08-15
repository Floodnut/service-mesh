# service-mesh

## Istio
1. helm repo
```sh
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo add kiali https://kiali.org/helm-charts
helm repo update

# If you want to write and release charts.
# helm install <release> <chart> --namespace <namespace> --create-namespace [--set <other_parameters>]
```

2. istio
```sh
kubectl create namespace istio-system
helm install istio-base istio/base -n istio-system --set defaultRevision=default

# If you want to see istio namespace and status
helm status istio-base -n istio-system
helm get all istio-base -n istio-system
```

3. check istio-namespace with helm
```sh
helm ls -n istio-system

# Example
# NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
# istio-base      istio-system    1               2024-08-13 00:45:30.5764 +0900 KST      deployed        base-1.22.3     1.22.3  
```

4. CNI for istio (if needed)
- https://istio.io/latest/docs/setup/additional-setup/cni/#installing-with-helm
```sh
# Install istio-cni node agent via helm or operator.

# helm
helm install istio-cni istio/cni -n istio-system --wait

# operator
cat <<EOF > istio-cni.yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  components:
    cni:
      namespace: istio-system
      enabled: true
EOF
istioctl install -f istio-cni.yaml -y
```

5. install istiod-service with helm
```sh
helm install istiod istio/istiod -n istio-system --set values.meshConfig.defaultConfig.tracing.zipkin.address="tempo.monitoring.svc.cluster.local:9411" --wait

# Jaeger addon
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.23/samples/addons/jaeger.yaml

# if you use cni
helm install istiod istio/istiod -n istio-system --set pilot.cni.enabled=true --wait
```

6. Check `istiod` Service
```sh
kubectl get deployments -n istio-system --output wide
```

7. (Optional) If you want to install ingress-gateway
```sh
kubectl create namespace istio-ingress
helm install istio-ingress istio/gateway -n istio-ingress --wait
```

8. istio injection
```sh
kubectl label namespace default istio-injection=enabled   
```

9. install istio-ingressgwateway
```sh
kubectl create namespace istio-ingress
helm install istio-ingressgateway istio/gateway -n istio-ingress --wait
helm install istio-ingress istio/gateway -n istio-system --wait
```

10. install kiali
```sh
helm install \
    --namespace istio-system \
    --set external_services.tracing.in_cluster_url=http://tempo.monitoring.svc.cluster.local:16685 \
    --set external_services.tracing.url=http://localhost:16686 \
    --set auth.strategy=anonymous \
    kiali-server \
    kiali/kiali-server
```

## Linkerd