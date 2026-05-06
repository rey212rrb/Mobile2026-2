// ═══════════════════════════════════════════════════════════════════════════
// AsistenciasFragment.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.ui;


import android.content.Context;
import android.os.Bundle;
import android.view.*;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clase12_ia_claude.R;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;
import com.example.clase12_ia_claude.navigation.Navigator;
import com.example.clase12_ia_claude.ui.GenericAdapter;
import com.example.clase12_ia_claude.ui.viewmodel.AsistenciasViewModel;

public class AsistenciasFragment extends Fragment {

    public static final String ARG_GRUPO_ID = "grupoId";
    public static final String ARG_GRUPO_NOMBRE = "grupoNombre";

    private Navigator navigator;
    private AsistenciasViewModel viewModel;

    public static AsistenciasFragment newInstance(long grupoId, String grupoNombre) {
        AsistenciasFragment fragment = new AsistenciasFragment();
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
        return inflater.inflate(R.layout.fragment_asistencias, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        long grupoId = requireArguments().getLong(ARG_GRUPO_ID);
        String grupoNombre = requireArguments().getString(ARG_GRUPO_NOMBRE);

        TextView tvTitulo = view.findViewById(R.id.tvAsistenciasTitulo);
        tvTitulo.setText("Asistencias – " + grupoNombre);

        viewModel = new ViewModelProvider(this).get(AsistenciasViewModel.class);
        viewModel.setGrupoId(grupoId);

        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewAsistencias);
        recyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));

        GenericAdapter<AsistenciaDetalle> adapter = new GenericAdapter<>(
                R.layout.item_asistencia,
                det -> det.asistenciaId,
                (itemView, det, pos) -> {
                    TextView tvNombre = itemView.findViewById(R.id.tvAsistNombreAlumno);
                    TextView tvFecha = itemView.findViewById(R.id.tvAsistFecha);
                    TextView tvEstado = itemView.findViewById(R.id.tvAsistEstado);
                    TextView tvObs = itemView.findViewById(R.id.tvAsistObservacion);

                    tvNombre.setText(det.nombreAlumno);
                    tvFecha.setText(det.fecha);

                    if (det.presente) {
                        tvEstado.setText("✓ Presente");
                        tvEstado.setTextColor(
                                ContextCompat.getColor(itemView.getContext(), R.color.green));
                    } else {
                        tvEstado.setText("✗ Ausente");
                        tvEstado.setTextColor(
                                ContextCompat.getColor(itemView.getContext(), R.color.red));
                    }

                    if (det.observacion != null && !det.observacion.isEmpty()) {
                        tvObs.setVisibility(View.VISIBLE);
                        tvObs.setText(det.observacion);
                    } else {
                        tvObs.setVisibility(View.GONE);
                    }
                }
        );

        recyclerView.setAdapter(adapter);

        viewModel.asistencias.observe(getViewLifecycleOwner(), lista -> {
            adapter.submitList(lista);
            TextView tvEmpty = view.findViewById(R.id.tvEmptyAsistencias);
            tvEmpty.setVisibility(lista.isEmpty() ? View.VISIBLE : View.GONE);
        });
    }

    @Override
    public void onDetach() {
        super.onDetach();
        navigator = null;
    }
}