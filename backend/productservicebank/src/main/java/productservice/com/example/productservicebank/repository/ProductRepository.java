package productservice.com.example.productservicebank.repository;

import productservice.com.example.productservicebank.entity.Product;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findByProductCode(String productCode);

    boolean existsByProductCode(String productCode);
}
