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
import java.util.List;

public class AlumnosFragment extends Fragment {

    private AlumnoAdapter adapter;

    public AlumnosFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_alumnos, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        int idCursoRecibido = -1;
        if (getArguments() != null) {
            idCursoRecibido = getArguments().getInt("idCurso");
        }

        RecyclerView rv = view.findViewById(R.id.rv_alumnos);
        rv.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new AlumnoAdapter();
        rv.setAdapter(adapter);

        final int finalIdCursoParaNavegacion = idCursoRecibido;
        adapter.setOnAlumnoClickListener(alumno -> {
            AsistenciaFragment fragmentoAsis = new AsistenciaFragment();
            Bundle datos = new Bundle();

            datos.putInt("idAlumno", alumno.id);
            datos.putInt("idCurso", finalIdCursoParaNavegacion);

            fragmentoAsis.setArguments(datos);

            getParentFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, fragmentoAsis)
                    .addToBackStack(null)
                    .commit();
        });

        AppDatabase db = AppDatabase.getInstance(getContext());

        db.alumnoDAO().obtenerAlumnosPorCurso(idCursoRecibido).observe(getViewLifecycleOwner(), alumnos -> {
            if (alumnos != null) {
                adapter.setAlumnos(alumnos);
            }
        });

        final int finalIdCurso = idCursoRecibido;
        view.findViewById(R.id.fab_agregar_alumno).setOnClickListener(v -> {
            mostrarDialogoAgregar(finalIdCurso);
        });
    }

    private void mostrarDialogoAgregar(int idCurso) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("Nuevo Alumno");

        View viewInflated = LayoutInflater.from(getContext()).inflate(R.layout.dialogo_alumno, null);

        final EditText inputNombre = viewInflated.findViewById(R.id.et_nombre);
        final EditText inputPaterno = viewInflated.findViewById(R.id.et_paterno);
        final EditText inputMaterno = viewInflated.findViewById(R.id.et_materno);
        final EditText inputCuenta = viewInflated.findViewById(R.id.et_cuenta);

        builder.setView(viewInflated);

        builder.setPositiveButton("Guardar", (dialog, which) -> {
            String nom = inputNombre.getText().toString().trim();
            String pat = inputPaterno.getText().toString().trim();
            String mat = inputMaterno.getText().toString().trim();
            String cue = inputCuenta.getText().toString().trim();

            if (!nom.isEmpty() && !pat.isEmpty() && !mat.isEmpty() && !cue.isEmpty()) {
                Alumno nuevo = new Alumno();
                nuevo.nombre = nom;
                nuevo.apellidoPaterno = pat;
                nuevo.apellidoMaterno = mat;
                nuevo.numeroDeCuenta = cue;
                nuevo.idCurso = idCurso;

                new Thread(() -> {
                    AppDatabase.getInstance(getContext()).alumnoDAO().insertar(nuevo);
                }).start();
            }
        });

        builder.setNegativeButton("Cancelar", (dialog, which) -> dialog.cancel());
        builder.show();
    }
}