package productservice.com.example.productservicebank.service;

import productservice.com.example.productservicebank.dto.CreateProductRequest;
import productservice.com.example.productservicebank.dto.ProductResponse;
import productservice.com.example.productservicebank.dto.UpdateRateRequest;
import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductResponse create(CreateProductRequest request);

    List<ProductResponse> findAll();

    ProductResponse findById(UUID id);

    ProductResponse updateRate(UUID id, UpdateRateRequest request);

    void deactivate(UUID id);
}
