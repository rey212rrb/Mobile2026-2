package com.example.clase3;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    //AppCompatActivity: Hereda funciones de una pantalla Android
    //implements View.OnClickListener: Le dice a la clase que debe estar atenta cuando alguien preciones un boton


    //1. Declaramos objetos que controla lo que se ve en pantalla
    TextView miTexto;
    TextView miGrupo;
    Button miButton;

    //3. Se decalra matriz bidimiencional
    String [][] nombres = {
            { "Cristian", "Pedro", "Pablo", "Mauricio" }, // 2291
            { "Kenia", "Paulina", "Giselle", "Alicia", "Claudia" } //2292
    };

    //Arreglo simple con los grupos
    String [] grupos = { "2291", "2292" };

    int indiceAlumno = 0; // Controla que alumno estamos viendo
    int indiceGrupo = 0; // Controla que grupo estamos viendo

    //4.

    @Override
    //Metodo onCreate
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); // Llama a la configuración interna para preparar la ventana
        setContentView(R.layout.activity_main); //Llama o infla diseño XML activuty_main

        //2. Es el puente entre la clase y la vista por ID
        miButton = findViewById(R.id.btnMiButton);
        miTexto = findViewById(R.id.txvMiTexto);
        miGrupo = findViewById(R.id.txvGrupo);

        miButton.setOnClickListener(this); //A esta clase, le asignamos el boton para que cuando se precione, se ejecute el metodo onClick

        //Validacion para que cuando inicie la App, aparezca el nombre del primer alumno y del grupo
        if (nombres.length > 0) {
            miGrupo.setText(grupos[indiceGrupo]);
            miTexto.setText(nombres[indiceGrupo][indiceAlumno]);
        }
    }

    /*private void renderizaAlumnos() {
        if (indice >= nombres[indiceGrupo][indice].length()) {
            indice = 0;
        }
        indice += 1;
        miTexto.setText(nombres[indiceGrupo][indice]);
    }

    private void renderizaGrupo() {
        if (indice >= nombres[indiceGrupo][indice].length()) {
            indiceGrupo += 1;
        }
        miGrupo.setText(grupos[indiceGrupo]);
    }+*/

    @Override
    //Logica del boton
    public void onClick(View v) {

       // renderizaAlumnos();
        // renderizaGrupo();

        indiceAlumno++; //Aumentamos en la posicion del alumno

        //Validacion si ya llegamos al final del arreglo de un grupo
        if (indiceAlumno >= nombres[indiceGrupo].length) {

            indiceAlumno = 0; //Regresamos al primer Alumno

            indiceGrupo++; //Bricamos a la siguiente grupo
        }


        if (indiceGrupo >= grupos.length) { //Si llegamos al final de los grupos, reiniciamos el indice de los grupos

            indiceGrupo = 0;

        }
        //Mostramos
        //Actualizamos el texto con los nuevos valores
        miGrupo.setText(grupos[indiceGrupo]);
        miTexto.setText(nombres[indiceGrupo][indiceAlumno]);

    }
}