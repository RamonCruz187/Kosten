package com.Kosten.Api_Rest.Exception;

public class DepartureNotFoundException extends RuntimeException{

    public DepartureNotFoundException(){
        super("La Salida no fue encontrada");
    }
    public DepartureNotFoundException(Integer id, String nameModel){
        super(String.format("El objeto no fue encontrado - id no encontrado: %d - Nombre del modelo: %s",
                id, nameModel));
    }

}
