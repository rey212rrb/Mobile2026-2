package com.example.clase12;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class CursoAdapter extends RecyclerView.Adapter<CursoAdapter.CursoViewHolder> {

    private List<Curso> listaCursos = new ArrayList<>();
    private OnCursoClickListener listener;

    public interface OnCursoClickListener {
        void onCursoClick(Curso curso);
    }

    public void setOnCursoClickListener(OnCursoClickListener listener) {
        this.listener = listener;
    }

    public void setCursos(List<Curso> cursos) {
        this.listaCursos = cursos;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CursoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_lista, parent, false);
        return new CursoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CursoViewHolder holder, int position) {
        Curso cursoActual = listaCursos.get(position);

        holder.tvTitulo.setText(cursoActual.nombreCurso);
        holder.tvSubtitulo.setText("ID Curso: " + cursoActual.id);

        // AQUÍ VA TU LÓGICA DE CLIC
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onCursoClick(cursoActual);
            }
        });
    }

    @Override
    public int getItemCount() {
        return listaCursos.size();
    }

    static class CursoViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitulo, tvSubtitulo;

        public CursoViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTitulo = itemView.findViewById(R.id.tv_titulo);
            tvSubtitulo = itemView.findViewById(R.id.tv_subtitulo);
        }
    }
}