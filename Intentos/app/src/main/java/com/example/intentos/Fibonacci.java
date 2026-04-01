package com.example.intentos;

public class Fibonacci {

    public static long funcion(Long nBase) {

        if (nBase <= 0) return 0;
        if (nBase == 1) return 1;

        long anterior = 0;
        long actual = 1;

        for (int i = 2; i <= nBase; i++) {
            long siguiente = anterior + actual;
            anterior = actual;
            actual = siguiente;
        }

        return actual;

    }

}


