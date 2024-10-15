package com.Kosten.Api_Rest.exception.TouristException;

public class NotFoundTourist extends RuntimeException {
    public NotFoundTourist() {
        super("El turista no existe");
    }
}
