package com.Kosten.Api_Rest.Exception.UserException;

public class NotFoundUser extends RuntimeException {
    public NotFoundUser() {
        super("El turista no existe");
    }
}
