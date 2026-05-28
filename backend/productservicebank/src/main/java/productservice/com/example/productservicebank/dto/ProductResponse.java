package productservice.com.example.productservicebank.dto;

import java.math.BigDecimal;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ProductResponse {

    private UUID id;
    private String productCode;
    private String productName;
    private Integer tenorMonths;
    private BigDecimal interestRate;
    private String currency;
    private Boolean active;
}
