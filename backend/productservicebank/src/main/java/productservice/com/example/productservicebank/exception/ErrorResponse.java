package productservice.com.example.productservicebank.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ErrorResponse {

    private String errorCode;
    private String message;
}
