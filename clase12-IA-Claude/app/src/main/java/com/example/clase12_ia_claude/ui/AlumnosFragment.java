// ═══════════════════════════════════════════════════════════════════════════
// AlumnosFragment.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.ui;

import android.content.Context;
import android.os.Bundle;
import android.view.*;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clase12_ia_claude.R;
import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.navigation.Navigator;
import com.example.clase12_ia_claude.ui.GenericAdapter;
import com.example.clase12_ia_claude.ui.viewmodel.AlumnosViewModel;

public class AlumnosFragment extends Fragment {

    public static final String ARG_GRUPO_ID = "grupoId";
    public static final String ARG_GRUPO_NOMBRE = "grupoNombre";

    private Navigator navigator;
    private AlumnosViewModel viewModel;
    private GenericAdapter<Alumno> adapter;

    public static AlumnosFragment newInstance(long grupoId, String grupoNombre) {
        AlumnosFragment fragment = new AlumnosFragment();
        Bundle args = new Bundle();
        args.putLong(ARG_GRUPO_ID, grupoId);
        args.putString(ARG_GRUPO_NOMBRE, grupoNombre);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof Navigator) navigator = (Navigator) context;
        else throw new RuntimeException(context + " must implement Navigator");
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_alumnos, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        long grupoId = requireArguments().getLong(ARG_GRUPO_ID);
        String grupoNombre = requireArguments().getString(ARG_GRUPO_NOMBRE);

        // Título del fragmento
        TextView tvTitulo = view.findViewById(R.id.tvAlumnosTitulo);
        tvTitulo.setText(grupoNombre);

        viewModel = new ViewModelProvider(this).get(AlumnosViewModel.class);
        viewModel.setGrupoId(grupoId);

        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewAlumnos);
        recyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));

        adapter = new GenericAdapter<>(
                R.layout.item_alumno,
                alumno -> alumno.alumnoId,
                (itemView, alumno, position) -> {
                    TextView tvNombre = itemView.findViewById(R.id.tvAlumnoNombre);
                    TextView tvMatricula = itemView.findViewById(R.id.tvAlumnoMatricula);

                    tvNombre.setText(alumno.getNombreCompleto());
                    tvMatricula.setText(alumno.matricula);
                }
        );

        // Click en alumno → navegar a asistencias del grupo
        adapter.setOnItemClickListener((alumno, pos) ->
                navigator.navigateToAsistencias(grupoId, grupoNombre)
        );

        recyclerView.setAdapter(adapter);

        viewModel.alumnos.observe(getViewLifecycleOwner(), alumnos -> {
            adapter.submitList(alumnos);
            TextView tvEmpty = view.findViewById(R.id.tvEmptyAlumnos);
            tvEmpty.setVisibility(alumnos.isEmpty() ? View.VISIBLE : View.GONE);
        });

        // Botón ver asistencias del grupo completo
        view.findViewById(R.id.btnVerAsistencias).setOnClickListener(v ->
                navigator.navigateToAsistencias(grupoId, grupoNombre)
        );
    }

    @Override
    public void onDetach() {
        super.onDetach();
        navigator = null;
    }
}