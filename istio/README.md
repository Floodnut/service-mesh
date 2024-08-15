# Istio observability

1. cert-manager
```sh
# if you use operator
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.13/cert-manager.yaml

# or helm
helm repo add jetstack https://charts.jetstack.io
helm repo update

kubectl create ns cert-manager

helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace -f monitoring/cert-manager.values.yaml --version v1.12.13
```

2. tempo-operator
```sh
kubectl apply -f https://github.com/grafana/tempo-operator/releases/download/v0.3.0/tempo-operator.yaml
kubectl create namespace tempo
```

3. trace bucket
```sh
# minio
kubectl apply -n tempo -f minio.yaml

kubectl create secret generic -n tempo tempostack-dev-minio \
--from-literal=bucket="tempo-data" \
--from-literal=endpoint="http://minio:9000" \
--from-literal=access_key_id="minio" \
--from-literal=access_key_secret="minio123"
```
```sh
# gcs
```

4. grafana
```sh
kubectl apply -n tempo -f - <<EOF
apiVersion: tempo.grafana.com/v1alpha1
kind: TempoStack
metadata:
  name: smm
spec:
  storageSize: 1Gi
  storage:
    secret:
      type: s3
      name: tempostack-dev-minio
  resources:
    total:
      limits:
        memory: 2Gi
        cpu: 2000m
  template:
    queryFrontend:
      jaegerQuery:
        enabled: true
        ingress:
          type: ingress
EOF
```

5. Check
```sh
kubectl get all -n tempo
```

6. trace test
```sh
kubectl apply -f - <<EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: tracegen
spec:
  template:
    spec:
      containers:
        - name: tracegen
          image: ghcr.io/open-telemetry/opentelemetry-collector-contrib/tracegen:latest
          command:
            - "./tracegen"
          args:
            - -otlp-endpoint=tempo-smm-distributor.tempo.svc.cluster.local:4317
            - -otlp-insecure
            - -duration=30s
            - -workers=1
      restartPolicy: Never
  backoffLimit: 4
EOF
```