package com.tiqkis.tiqpass.common.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        // Log the exception (optional)
        // Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
        // logger.error("Access denied exception", ex);

        // Return a 403 Forbidden status with a custom message
        return new ResponseEntity<>("You do not have permission to access this resource", HttpStatus.FORBIDDEN);
    }

    // You can also handle other exceptions here
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex, WebRequest request) {
        // Log the exception (optional)
        // Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
        // logger.error("An error occurred", ex);

        // Return a 500 Internal Server Error status with a custom message
        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<String> handleDuplicateUsernameException(DuplicateUsernameException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}