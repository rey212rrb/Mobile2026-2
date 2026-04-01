package com.example.calculadora;

public class ViewModel {

    ICalculadora calculadora = new Calculadora();

    ViewModel(){


    }

    public Double ejecutarCalculo(CalculadoraInput input) {
        if (input == null || input.operacionInicial == null) return 0.0;

        Double resultadoAcumulado = makeOperation(input.operacionInicial);

        if (input.operaciones != null) {
            for (OperacionMin opMin : input.operaciones) {
                resultadoAcumulado = ejecutarOperacionMinima(resultadoAcumulado, opMin);
            }
        }

        return resultadoAcumulado;
    }

    private Double ejecutarOperacionMinima(Double acumulado, OperacionMin opMin) {
        switch (opMin.getOperationType()) {
            case ADD: return calculadora.sumar(acumulado, opMin.getX());
            case SUBSTRAC: return calculadora.resta(opMin.getX(), acumulado);
            case MULTIP: return calculadora.multi(acumulado, opMin.getX());
            case DIV: return calculadora.div(acumulado, opMin.getX());
            default: return acumulado;
        }
    }

    public Double makeOperation(Operacion operacion) {
        if (operacion == null) return 0.0;

        switch (operacion.getOperationType()) {
            case ADD: return calculadora.sumar(operacion.getX(), operacion.getY());
            case SUBSTRAC: return calculadora.resta(operacion.getY(), operacion.getX());
            case MULTIP: return calculadora.multi(operacion.getX(), operacion.getY());
            case DIV: return calculadora.div(operacion.getX(), operacion.getY());
            default: return 0.0;
        }
    }

    public Double makeOperation(Operacion[] operacions) {
        Double cache = 0.0;
        for (Operacion operacion : operacions) {
            cache += makeOperation(operacion);         }
        return cache;
    }


}
