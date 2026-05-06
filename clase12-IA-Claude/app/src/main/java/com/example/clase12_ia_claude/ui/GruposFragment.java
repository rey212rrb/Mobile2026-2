// ═══════════════════════════════════════════════════════════════════════════
// GruposFragment.java  –  Fragmento Principal
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
import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.navigation.Navigator;
import com.example.clase12_ia_claude.ui.viewmodel.GruposViewModel;


public class GruposFragment extends Fragment {

    private Navigator navigator;
    private GruposViewModel viewModel;
    private GenericAdapter<Grupo> adapter;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof Navigator) {
            navigator = (Navigator) context;
        } else {
            throw new RuntimeException(context + " must implement Navigator");
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_grupos, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Configurar ViewModel
        viewModel = new ViewModelProvider(this).get(GruposViewModel.class);

        // Configurar RecyclerView con adaptador genérico
        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewGrupos);
        recyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));

        adapter = new GenericAdapter<>(
            R.layout.item_grupo,
            grupo -> grupo.grupoId,            // función para DiffUtil
            (itemView, grupo, position) -> {   // Binder lambda
                TextView tvNombre = itemView.findViewById(R.id.tvGrupoNombre);
                TextView tvHorario = itemView.findViewById(R.id.tvGrupoHorario);
                TextView tvSemestre = itemView.findViewById(R.id.tvGrupoSemestre);

                tvNombre.setText(grupo.nombre);
                tvHorario.setText(grupo.horario);
                tvSemestre.setText(grupo.semestre);
            }
        );

        adapter.setOnItemClickListener((grupo, position) ->
            navigator.navigateToAlumnos(grupo)
        );

        recyclerView.setAdapter(adapter);

        // Observar LiveData
        viewModel.grupos.observe(getViewLifecycleOwner(), grupos -> {
            adapter.submitList(grupos);
            TextView tvEmpty = view.findViewById(R.id.tvEmptyGrupos);
            tvEmpty.setVisibility(grupos.isEmpty() ? View.VISIBLE : View.GONE);
        });
    }

    @Override
    public void onDetach() {
        super.onDetach();
        navigator = null;
    }
}






