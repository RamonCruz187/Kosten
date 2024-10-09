package com.Kosten.Api_Rest.dto;

public record BaseResponse(
        boolean isError,
        int code,
        String status,
        String message
) {
}
