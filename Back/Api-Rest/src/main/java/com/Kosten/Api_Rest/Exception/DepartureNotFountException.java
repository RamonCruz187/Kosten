package com.Kosten.Api_Rest.Exception;

public class DepartureNotFountException extends RuntimeException{

    public DepartureNotFountException(){
        super("The departure was not found.");
    }
    public DepartureNotFountException(Integer id, String nameModel){
        super(String.format("The object was not found - id not found: %d - Name model: %s",
                id, nameModel));
    }

}
