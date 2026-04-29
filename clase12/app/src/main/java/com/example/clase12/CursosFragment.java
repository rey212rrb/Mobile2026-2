package com.example.clase12;

import android.app.AlertDialog;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

public class CursosFragment extends Fragment {

    private CursoAdapter adapter;

    public CursosFragment() {
        // Constructor vacío requerido
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_cursos, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        RecyclerView rv = view.findViewById(R.id.rv_cursos);
        rv.setLayoutManager(new LinearLayoutManager(getContext()));

        adapter = new CursoAdapter();
        rv.setAdapter(adapter);

        adapter.setOnCursoClickListener(curso -> {
            AlumnosFragment fragmentoAlumnos = new AlumnosFragment();

            Bundle datos = new Bundle();
            datos.putInt("idCurso", curso.id);
            fragmentoAlumnos.setArguments(datos);

            getParentFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, fragmentoAlumnos)
                    .addToBackStack(null)
                    .commit();
        });

        AppDatabase db = AppDatabase.getInstance(getContext());
        db.cursoDAO().obtenerTodos().observe(getViewLifecycleOwner(), cursos -> {
            if (cursos != null) {
                adapter.setCursos(cursos);
            }
        });

        view.findViewById(R.id.fab_agregar_curso).setOnClickListener(v -> {
            mostrarDialogoAgregarCurso();
        });
    }

    private void mostrarDialogoAgregarCurso() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("Nuevo Curso");

        View viewInflated = LayoutInflater.from(getContext()).inflate(R.layout.dialogo_alumno, null);
        final EditText inputNombre = viewInflated.findViewById(R.id.et_nombre);

        viewInflated.findViewById(R.id.et_paterno).setVisibility(View.GONE);
        viewInflated.findViewById(R.id.et_materno).setVisibility(View.GONE);
        viewInflated.findViewById(R.id.et_cuenta).setVisibility(View.GONE);

        inputNombre.setHint("Nombre de la materia");

        builder.setView(viewInflated);

        builder.setPositiveButton("Guardar", (dialog, which) -> {
            String nombre = inputNombre.getText().toString().trim();

            if (!nombre.isEmpty()) {
                Curso nuevo = new Curso();
                nuevo.nombreCurso = nombre;

                new Thread(() -> {
                    AppDatabase.getInstance(getContext()).cursoDAO().insertar(nuevo);
                }).start();
            }
        });

        builder.setNegativeButton("Cancelar", (dialog, which) -> dialog.cancel());
        builder.show();
    }
}