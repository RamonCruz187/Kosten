package com.Kosten.Api_Rest.exception.TouristException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler({NotFoundTourist.class})
    public ProblemDetail NotFoundException(RuntimeException runtimeException){
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, runtimeException.getMessage());
    }

    @ExceptionHandler({TouristAlreadyExistsException.class})
    public ProblemDetail AlreadyExistsException(RuntimeException runtimeException){
        return ProblemDetail.forStatusAndDetail(HttpStatus.FOUND, runtimeException.getMessage());
    }
}
