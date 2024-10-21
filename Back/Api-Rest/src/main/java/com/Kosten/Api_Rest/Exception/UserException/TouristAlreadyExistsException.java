package com.Kosten.Api_Rest.Exception.TouristException;

public class TouristAlreadyExistsException extends RuntimeException{
    public TouristAlreadyExistsException() {
        super("El turista ya existe");
    }
}
