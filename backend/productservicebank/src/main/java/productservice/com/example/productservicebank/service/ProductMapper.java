package productservice.com.example.productservicebank.service;

import productservice.com.example.productservicebank.dto.ProductResponse;
import productservice.com.example.productservicebank.entity.Product;

public class ProductMapper {

    private ProductMapper() {
    }

    public static ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .productCode(product.getProductCode())
                .productName(product.getProductName())
                .tenorMonths(product.getTenorMonths())
                .interestRate(product.getInterestRate())
                .currency(product.getCurrency())
                .active(product.getActive())
                .build();
    }
}
