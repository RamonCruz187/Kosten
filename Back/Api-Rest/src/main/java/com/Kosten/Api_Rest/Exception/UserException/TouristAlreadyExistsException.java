package com.Kosten.Api_Rest.exception.TouristException;

public class TouristAlreadyExistsException extends RuntimeException{
    public TouristAlreadyExistsException() {
        super("El turista ya existe");
    }
}
