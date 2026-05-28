package productservice.com.example.productservicebank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder()
                        .errorCode("PRODUCT_NOT_FOUND")
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(DuplicateProductException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateProductException ex) {
        return ResponseEntity.badRequest()
                .body(ErrorResponse.builder()
                        .errorCode("DUPLICATE_PRODUCT")
                        .message(ex.getMessage())
                        .build());
    }
}
