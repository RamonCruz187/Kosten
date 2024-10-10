package com.Kosten.Api_Rest.dto;

public record ExtendedBaseResponse<T>(
        boolean isError,
        int code,
        String status,
        String message,
        T data
) {
    public static <T> ExtendedBaseResponse<T> of(BaseResponse baseResponse, T data) {
        return new ExtendedBaseResponse<>(
                baseResponse.isError(),
                baseResponse.code(),
                baseResponse.status(),
                baseResponse.message(),
                data
        );
    }
}

