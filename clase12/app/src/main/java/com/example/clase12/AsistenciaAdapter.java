package com.example.clase12;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class AsistenciaAdapter extends RecyclerView.Adapter<AsistenciaAdapter.AsistenciaViewHolder> {

    private List<Asistencia> listaAsistencias = new ArrayList<>();

    public void setAsistencias(List<Asistencia> asistencias) {
        this.listaAsistencias = asistencias;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public AsistenciaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Reusamos item_lista.xml
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_lista, parent, false);
        return new AsistenciaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AsistenciaViewHolder holder, int position) {
        Asistencia asis = listaAsistencias.get(position);
        holder.tvTitulo.setText("Asistencia registrada:");
        holder.tvSubtitulo.setText(asis.fecha);
    }

    @Override
    public int getItemCount() {
        return listaAsistencias.size();
    }

    static class AsistenciaViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitulo, tvSubtitulo;
        public AsistenciaViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTitulo = itemView.findViewById(R.id.tv_titulo);
            tvSubtitulo = itemView.findViewById(R.id.tv_subtitulo);
        }
    }
}