$CLUSTER_NAME = "microbank"
$ROOT = Split-Path -Parent $PSScriptRoot
$KIND = "$ROOT\kind.exe"

if (-not (Test-Path $KIND)) {
  $KIND = Join-Path (Split-Path -Parent $ROOT) "kind.exe"
}

if (-not (Test-Path $KIND)) {
  Write-Host "kind.exe not found in $ROOT or parent directory." -ForegroundColor Red
  exit 1
}

Write-Host "Using kind: $KIND"

Write-Host ""
Write-Host "====================================="
Write-Host " CREATE KIND CLUSTER"
Write-Host "====================================="

$clusterExists = $false
try {
  $clusterList = & $KIND get clusters 2>$null
  if ($clusterList) {
    $clusterNames = $clusterList -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
    if ($clusterNames -contains $CLUSTER_NAME) {
      $clusterExists = $true
    }
  }
} catch {
  $clusterExists = $false
}

if (-not $clusterExists) {
  Write-Host "Creating kind cluster '$CLUSTER_NAME'..."
  & $KIND create cluster --name $CLUSTER_NAME
} else {
  Write-Host "Kind cluster '$CLUSTER_NAME' already exists."
}

kubectl config use-context kind-$CLUSTER_NAME 2>$null

Write-Host ""
Write-Host "====================================="
Write-Host " BUILD DOCKER IMAGES"
Write-Host "====================================="

docker build -t product-service:latest `
  "$ROOT\backend\productservicebank"

docker build -t account-service:latest `
  "$ROOT\backend\accountservicebank"

docker build `
  --build-arg VITE_API_BASE_URL=http://localhost:8000 `
  -t frontend:latest `
  "$ROOT\frontend"

Write-Host ""
Write-Host "====================================="
Write-Host " LOAD IMAGES INTO KIND"
Write-Host "====================================="

& $KIND load docker-image product-service:latest --name $CLUSTER_NAME
& $KIND load docker-image account-service:latest --name $CLUSTER_NAME
& $KIND load docker-image frontend:latest --name $CLUSTER_NAME

Write-Host ""
Write-Host "====================================="
Write-Host " APPLY KUBERNETES MANIFESTS"
Write-Host "====================================="

kubectl apply -f "$PSScriptRoot\namespace.yaml"

kubectl apply -f "$PSScriptRoot\product-db.yaml"
kubectl apply -f "$PSScriptRoot\account-db.yaml"

kubectl apply -f "$PSScriptRoot\product-service\deployment.yml"
kubectl apply -f "$PSScriptRoot\product-service\service.yml"

kubectl apply -f "$PSScriptRoot\account-service\deployment.yml"
kubectl apply -f "$PSScriptRoot\account-service\service.yml"

kubectl apply -f "$PSScriptRoot\frontend\deployment.yml"
kubectl apply -f "$PSScriptRoot\frontend\service.yml"

kubectl apply -f "$PSScriptRoot\kong\configmap.yml"
kubectl apply -f "$PSScriptRoot\kong\deployment.yml"
kubectl apply -f "$PSScriptRoot\kong\service.yml"

kubectl apply -f "$PSScriptRoot\monitoring\prometheus.yml"
kubectl apply -f "$PSScriptRoot\monitoring\grafana.yml"

Write-Host ""
Write-Host "====================================="
Write-Host " WAIT FOR PODS"
Write-Host "====================================="

kubectl wait `
  --for=condition=Ready `
  pods `
  --all `
  -n microbank `
  --timeout=300s

Write-Host ""
Write-Host "====================================="
Write-Host " PODS"
Write-Host "====================================="

kubectl get pods -n microbank

Write-Host ""
Write-Host "====================================="
Write-Host " SERVICES"
Write-Host "====================================="

kubectl get svc -n microbank

Write-Host ""
Write-Host "====================================="
Write-Host " START PORT FORWARD"
Write-Host "====================================="

Start-Process powershell -ArgumentList "kubectl port-forward -n microbank svc/frontend 3000:80"
Start-Process powershell -ArgumentList "kubectl port-forward -n microbank svc/kong 8000:8000"
Start-Process powershell -ArgumentList "kubectl port-forward -n microbank svc/prometheus 9090:9090"
Start-Process powershell -ArgumentList "kubectl port-forward -n microbank svc/grafana 3001:3000"

Write-Host ""
Write-Host "====================================="
Write-Host " APPLICATION URLS"
Write-Host "====================================="
Write-Host "Frontend   : http://localhost:3000"
Write-Host "Kong API   : http://localhost:8000"
Write-Host "Prometheus : http://localhost:9090"
Write-Host "Grafana    : http://localhost:3001"
Write-Host "====================================="

