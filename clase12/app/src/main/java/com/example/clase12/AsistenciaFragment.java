package com.example.clase12;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class AsistenciaFragment extends Fragment {

    private AsistenciaAdapter adapter;

    public AsistenciaFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_asistencia, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        int idAlumno = -1;
        int idCurso = -1;
        if (getArguments() != null) {
            idAlumno = getArguments().getInt("idAlumno");
            idCurso = getArguments().getInt("idCurso");
        }

        RecyclerView rv = view.findViewById(R.id.rv_asistencias);
        rv.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new AsistenciaAdapter();
        rv.setAdapter(adapter);

        AppDatabase db = AppDatabase.getInstance(getContext());
        db.asistenciaDAO().obtenerAsistenciasPorAlumno(idAlumno, idCurso).observe(getViewLifecycleOwner(), asistencias -> {
            if (asistencias != null) {
                adapter.setAsistencias(asistencias);
            }
        });

        final int finalIdAlumno = idAlumno;
        final int finalIdCurso = idCurso;
        view.findViewById(R.id.fab_registrar_asistencia).setOnClickListener(v -> {
            registrarAsistencia(finalIdAlumno, finalIdCurso);
        });
    }

    private void registrarAsistencia(int idAlu, int idCur) {
        Asistencia nueva = new Asistencia();
        nueva.idAlumno = idAlu;
        nueva.idCurso = idCur;

        String fechaActual = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault()).format(new Date());
        nueva.fecha = fechaActual;

        new Thread(() -> {
            AppDatabase.getInstance(getContext()).asistenciaDAO().registrarAsistencia(nueva);
        }).start();
    }
}