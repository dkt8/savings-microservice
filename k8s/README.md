# Kubernetes deployment for microservice_bank

Thư mục `k8s` đã được tái cấu trúc theo từng service riêng:

- `k8s/product-service`
  - `deployment.yml`
  - `service.yml`
- `k8s/account-service`
  - `deployment.yml`
  - `service.yml`
- `k8s/frontend`
  - `deployment.yml`
  - `service.yml`
- `k8s/kong`
  - `deployment.yml`
  - `service.yml`
  - `configmap.yml`
- `k8s/monitoring`
  - `prometheus.yml`
  - `grafana.yml`

## Các bước deploy

1. Tạo cluster kind:
   ```powershell
   kind create cluster --name microbank
   ```

2. Build image local:
   ```powershell
   docker build -t product-service:latest .\backend\productservicebank
   docker build -t account-service:latest .\backend\accountservicebank
   docker build --build-arg VITE_API_BASE_URL=http://localhost:8000 -t frontend:latest .\frontend
   ```

3. Load image vào kind:
   ```powershell
   kind load docker-image product-service:latest --name microbank
   kind load docker-image account-service:latest --name microbank
   kind load docker-image frontend:latest --name microbank
   ```

4. Áp manifest:
   ```powershell
   kubectl apply -f namespace.yaml
   kubectl apply -f product-db.yaml
   kubectl apply -f account-db.yaml
   kubectl apply -f product-service/deployment.yml
   kubectl apply -f product-service/service.yml
   kubectl apply -f account-service/deployment.yml
   kubectl apply -f account-service/service.yml
   kubectl apply -f frontend/deployment.yml
   kubectl apply -f frontend/service.yml
   kubectl apply -f kong/configmap.yml
   kubectl apply -f kong/deployment.yml
   kubectl apply -f kong/service.yml
   kubectl apply -f monitoring/prometheus.yml
   kubectl apply -f monitoring/grafana.yml
   ```

5. Kiểm tra:
   ```powershell
   kubectl get pods -n microbank
   kubectl get svc -n microbank
   ```

6. Truy cập dịch vụ:
   ```powershell
   kubectl port-forward -n microbank svc/frontend 3000:80
   kubectl port-forward -n microbank svc/kong 8000:8000
   kubectl port-forward -n microbank svc/product-service 8081:8080
   kubectl port-forward -n microbank svc/account-service 8082:8080
   kubectl port-forward -n microbank svc/prometheus 9090:9090
   kubectl port-forward -n microbank svc/grafana 3001:3000
   ```

   Sau khi port-forward, truy cập frontend bằng `http://localhost:3000` và frontend sẽ gọi API qua Kong trên `http://localhost:8000`.

## Ghi chú

- Nếu deploy trên Kind, image phải được `kind load docker-image`.
- `product-db.yaml` và `account-db.yaml` vẫn dùng ConfigMap để mount file `init.sql` khởi tạo.
- `frontend` sử dụng `VITE_API_BASE_URL=http://localhost:8000` để gọi Kong khi chạy local bằng port-forward.
- Nếu cần mở rộng thêm `frontend`, có thể thiết kế manifest tương tự từ `docker-compose.yml`.
