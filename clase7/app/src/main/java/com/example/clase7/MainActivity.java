package com.example.clase7;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;

public class MainActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    RecyclerView.Adapter adapter;
    ArrayList<String> listaNombres;

    EditText edtNombre;
    Button btnAgregar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //Esto es para que arranque la aplicacion de java
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        //creamos el arreglo y le metemos de golpe los nombres
        listaNombres = new ArrayList<>(Arrays.asList("Mario", "Luigi", "Peach", "Browser"));

        //Conectamos los elementos del xml con java
        recyclerView = findViewById(R.id.my_recycler_view);
        edtNombre = findViewById(R.id.edtNombre);
        btnAgregar = findViewById(R.id.btnAgregar);


        //Creo adapter
        adapter = new MiAdaptador(listaNombres);
        //le digo que es vertical
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        //inicializo
        recyclerView.setAdapter(adapter);

        btnAgregar.setOnClickListener(v -> {
            String nombre = edtNombre.getText().toString().trim();
            //Si hay nombre, inyecta nombre
            if (!nombre.isEmpty()) {
                listaNombres.add(nombre);

                //Nombre al final de la fila
                adapter.notifyItemInserted(listaNombres.size() - 1);

                //Borra la viewText :p
                edtNombre.setText("");

                //Hace la lista hacia arriba
                recyclerView.scrollToPosition(listaNombres.size() - 1);
            }
        });
    }
}
