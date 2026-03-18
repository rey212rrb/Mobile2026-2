package com.example.calculadoratarea.implementaciones;

import com.example.calculadoratarea.enums.Operacion;
import com.example.calculadoratarea.interfaces.ICalculadora;

public class CalcularImp implements ICalculadora {
    @Override
    public double calcular(double n1, double n2, Operacion operacion) {

        switch (operacion){

            case SUMA:
                return n1 + n2;

            case RESTA:
                return  n1 - n2;

            case MULTIPLICACION:
                return n1 * n2;


            case DIVISION:
                if(n2 != 0){

                    return n1 / n2;

                }else {


                    return 0;
                }

            default:
                return 0;

        }

    }
}
