package productservice.com.example.productservicebank.controller;

import productservice.com.example.productservicebank.dto.CreateProductRequest;
import productservice.com.example.productservicebank.dto.ProductResponse;
import productservice.com.example.productservicebank.dto.UpdateRateRequest;
import productservice.com.example.productservicebank.service.ProductService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ProductResponse create(@Valid @RequestBody CreateProductRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<ProductResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PutMapping("/{id}/rate")
    public ProductResponse updateRate(@PathVariable UUID id, @Valid @RequestBody UpdateRateRequest request) {
        return service.updateRate(id, request);
    }

    @PutMapping("/{id}/deactivate")
    public void deactivate(@PathVariable UUID id) {
        service.deactivate(id);
    }
}
