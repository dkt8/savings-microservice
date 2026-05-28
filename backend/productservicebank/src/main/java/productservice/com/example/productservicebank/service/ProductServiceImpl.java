package productservice.com.example.productservicebank.service;

import productservice.com.example.productservicebank.dto.CreateProductRequest;
import productservice.com.example.productservicebank.dto.ProductResponse;
import productservice.com.example.productservicebank.dto.UpdateRateRequest;
import productservice.com.example.productservicebank.entity.Product;
import productservice.com.example.productservicebank.exception.DuplicateProductException;
import productservice.com.example.productservicebank.exception.ProductNotFoundException;
import productservice.com.example.productservicebank.repository.ProductRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    @Override
    public ProductResponse create(CreateProductRequest request) {
        if (repository.existsByProductCode(request.getProductCode())) {
            throw new DuplicateProductException("Product already exists");
        }

        Product product = Product.builder()
                .productCode(request.getProductCode())
                .productName(request.getProductName())
                .tenorMonths(request.getTenorMonths())
                .interestRate(request.getInterestRate())
                .currency(request.getCurrency())
                .active(true)
                .build();

        return ProductMapper.toResponse(repository.save(product));
    }

    @Override
    public List<ProductResponse> findAll() {
        return repository.findAll().stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    @Override
    public ProductResponse findById(UUID id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        return ProductMapper.toResponse(product);
    }

    @Override
    public ProductResponse updateRate(UUID id, UpdateRateRequest request) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        product.setInterestRate(request.getInterestRate());
        return ProductMapper.toResponse(repository.save(product));
    }

    @Override
    public void deactivate(UUID id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        product.setActive(false);
        repository.save(product);
    }
}
