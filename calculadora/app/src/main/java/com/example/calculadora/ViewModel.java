package com.example.calculadora;

public class ViewModel {

    ICalculadora calculadora = new Calculadora();

    ViewModel(){


    }

    double sumar(double x, double y){

        return calculadora.sumar(x, y);

    }

    double resta (double y, double x){

        return calculadora.resta(y, x);

    }

    double multi(double x, double y){

        return calculadora.multi(x, y);

    }

    double div(double x, double y){

        return calculadora.multi(x, y);

    }
}
