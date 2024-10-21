package com.Kosten.Api_Rest.Exception.reportCommentExc;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ReportCommentNotFoundException extends RuntimeException{
    public ReportCommentNotFoundException(String message) {
        super(message);
    }
}
