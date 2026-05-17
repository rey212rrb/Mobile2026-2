package com.example.googleoauth;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import com.example.googleoauth.auth.LoginActivity;

public class SplashActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // MODIFICADO: Cambiado a 6000 milisegundos (6 segundos)
        int tiempoEspera = 6000;

        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                // Pasamos al Login de BBVA
                Intent intent = new Intent(SplashActivity.this, LoginActivity.class);
                startActivity(intent);
                finish(); // Cerramos el Splash para que no puedan regresar con el botón de atrás
            }
        }, tiempoEspera);
    }
}