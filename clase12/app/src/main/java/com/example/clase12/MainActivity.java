package com.example.clase12;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        cambiarFragmento(new CursosFragment());

        findViewById(R.id.btn_cursos).setOnClickListener(v -> cambiarFragmento(new CursosFragment()));
        findViewById(R.id.btn_alumnos).setOnClickListener(v -> cambiarFragmento(new AlumnosFragment()));
        findViewById(R.id.btn_asistencia).setOnClickListener(v -> cambiarFragmento(new AsistenciaFragment()));
    }

    private void cambiarFragmento(Fragment fragmento) {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragmento)
                .commit();
    }
}