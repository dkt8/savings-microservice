package productservice.com.example.productservicebank.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class UpdateRateRequest {

    @NotNull
    private BigDecimal interestRate;
}
