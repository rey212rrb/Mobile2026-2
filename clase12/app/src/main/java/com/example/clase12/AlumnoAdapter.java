package com.example.clase12;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class AlumnoAdapter extends RecyclerView.Adapter<AlumnoAdapter.AlumnoViewHolder> {

    private List<Alumno> listaAlumnos = new ArrayList<>();

    private OnAlumnoClickListener listener;

    public interface OnAlumnoClickListener {
        void onAlumnoClick(Alumno alumno);
    }

    public void setOnAlumnoClickListener(OnAlumnoClickListener listener) {
        this.listener = listener;
    }

    public void setAlumnos(List<Alumno> alumnos) {
        this.listaAlumnos = alumnos;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public AlumnoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_lista, parent, false);
        return new AlumnoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AlumnoViewHolder holder, int position) {
        Alumno alumnoActual = listaAlumnos.get(position);

        String nombreCompleto = alumnoActual.nombre + " " +
                alumnoActual.apellidoPaterno + " " +
                alumnoActual.apellidoMaterno;

        holder.tvTitulo.setText(nombreCompleto);
        holder.tvSubtitulo.setText("Cuenta: " + alumnoActual.numeroDeCuenta);

        holder.itemView.setOnClickListener(v -> {
            if (listener != null) {
                listener.onAlumnoClick(alumnoActual);
            }
        });
    }

    @Override
    public int getItemCount() {
        return listaAlumnos.size();
    }

    public static class AlumnoViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitulo, tvSubtitulo;

        public AlumnoViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTitulo = itemView.findViewById(R.id.tv_titulo);
            tvSubtitulo = itemView.findViewById(R.id.tv_subtitulo);
        }
    }
}