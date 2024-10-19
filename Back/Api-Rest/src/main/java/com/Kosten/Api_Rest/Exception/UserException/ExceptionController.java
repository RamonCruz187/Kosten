package com.Kosten.Api_Rest.Exception.UserException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler({NotFoundUser.class})
    public ProblemDetail NotFoundException(RuntimeException runtimeException){
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, runtimeException.getMessage());
    }
}
