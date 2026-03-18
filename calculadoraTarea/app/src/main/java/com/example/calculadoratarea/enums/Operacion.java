package com.example.calculadoratarea.enums;

public enum Operacion {

    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION

    //Agregar Potencia, solo la agregar al Enum y al switch
    //Enum impide que alguien intente pasar un texto raro como "SUMAME_ESTO"; Java solo aceptará lo que definiste en Operacion
}
