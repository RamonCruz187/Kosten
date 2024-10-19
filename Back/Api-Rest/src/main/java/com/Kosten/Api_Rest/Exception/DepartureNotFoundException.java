package com.Kosten.Api_Rest.Exception;

public class DepartureNotFoundException extends RuntimeException{

    public DepartureNotFoundException(){
        super("The departure was not found.");
    }
    public DepartureNotFoundException(Integer id, String nameModel){
        super(String.format("The object was not found - id not found: %d - Name model: %s",
                id, nameModel));
    }

}
