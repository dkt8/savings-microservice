package productservice.com.example.productservicebank.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class CreateProductRequest {

    @NotBlank
    private String productCode;

    @NotBlank
    private String productName;

    @NotNull
    private Integer tenorMonths;

    @NotNull
    private BigDecimal interestRate;

    @NotBlank
    private String currency;
}
