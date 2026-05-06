package com.example.clase12_ia_claude.ui;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.LayoutRes;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.DiffUtil;
import androidx.recyclerview.widget.ListAdapter;
import androidx.recyclerview.widget.RecyclerView;

import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * Adaptador genérico para RecyclerView.
 *
 * Evita la creación de adaptadores repetitivos para cada pantalla.
 * Utiliza {@link ListAdapter} con {@link DiffUtil} para actualizaciones eficientes.
 *
 * @param <T> Tipo del modelo de datos (Grupo, Alumno, AsistenciaDetalle, etc.)
 */
public class GenericAdapter<T> extends ListAdapter<T, GenericAdapter.GenericViewHolder<T>> {

    /**
     * Interfaz funcional para vincular datos a una vista.
     */
    public interface Binder<T> {
        void bind(View itemView, T item, int position);
    }

    private final int layoutResId;
    private final Binder<T> binder;
    private OnItemClickListener<T> clickListener;

    public interface OnItemClickListener<T> {
        void onItemClick(T item, int position);
    }

    /**
     * Constructor genérico.
     *
     * @param layoutResId  ID del layout XML del ítem
     * @param itemIdGetter función que extrae un ID único del ítem (para DiffUtil)
     * @param binder       lambda que vincula el modelo a la vista
     */
    public GenericAdapter(
            @LayoutRes int layoutResId,
            Function<T, Object> itemIdGetter,
            Binder<T> binder) {

        super(new DiffUtil.ItemCallback<T>() {
            @Override
            public boolean areItemsTheSame(@NonNull T oldItem, @NonNull T newItem) {
                return itemIdGetter.apply(oldItem).equals(itemIdGetter.apply(newItem));
            }

            @SuppressLint("DiffUtilEquals")
            @Override
            public boolean areContentsTheSame(@NonNull T oldItem, @NonNull T newItem) {
                return oldItem.equals(newItem);
            }
        });

        this.layoutResId = layoutResId;
        this.binder = binder;
    }

    public void setOnItemClickListener(OnItemClickListener<T> listener) {
        this.clickListener = listener;
    }

    @NonNull
    @Override
    public GenericViewHolder<T> onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(layoutResId, parent, false);
        return new GenericViewHolder<>(view, binder, clickListener);
    }

    @Override
    public void onBindViewHolder(@NonNull GenericViewHolder<T> holder, int position) {
        holder.bind(getItem(position), position);
    }

    // ── ViewHolder ────────────────────────────────────────────────────────
    public static class GenericViewHolder<T> extends RecyclerView.ViewHolder {

        private final Binder<T> binder;
        private final OnItemClickListener<T> clickListener;

        public GenericViewHolder(
                @NonNull View itemView,
                Binder<T> binder,
                OnItemClickListener<T> clickListener) {
            super(itemView);
            this.binder = binder;
            this.clickListener = clickListener;
        }

        public void bind(T item, int position) {
            binder.bind(itemView, item, position);
            if (clickListener != null) {
                itemView.setOnClickListener(v -> clickListener.onItemClick(item, position));
            }
        }
    }
}
