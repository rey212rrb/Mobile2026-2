package com.example.clase3;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class SegundaActividad extends AppCompatActivity {

    //Log.i("FCA", "onCreate() executed");

    TextView txvTitulo;

    Button btnIncrementa;


    int contador = 0;

    String miLlave = "actividad.segunda.miLlave";

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); // Llama a la configuración interna para preparar la ventana


        setContentView(R.layout.activity_segunda);
        txvTitulo = findViewById(R.id.txvTitulo);
        btnIncrementa = findViewById(R.id.btnIncrementa);

        if (savedInstanceState != null && savedInstanceState.containsKey(miLlave)){
            contador = savedInstanceState.getInt(miLlave);
            muestraTitulo();
        }



        btnIncrementa.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                contador += 1;
                muestraTitulo();
            }
        });

        Log.i("FCA", "onCreate() executed");

    }

    public void muestraTitulo(){
        txvTitulo.setText(""+ contador);

    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.i("FCA", "onStart() executed");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.i("FCA", "onRestart() executed");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i("FCA", "onPause() executed");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.i("FCA", "onStop() executed");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i("FCA", "onResume() executed");
    }



    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i("FCA", "onDestroy() executed");
    }

    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(miLlave, contador);
    }
}


//Ciclo de Vida
