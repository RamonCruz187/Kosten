package com.Kosten.Api_Rest.Exception.TouristException;

public class NotFoundTourist extends RuntimeException {
    public NotFoundTourist() {
        super("El turista no existe");
    }
}
