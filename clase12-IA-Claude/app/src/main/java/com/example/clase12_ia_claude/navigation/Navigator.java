package com.example.clase12_ia_claude.navigation;

import com.example.clase12_ia_claude.data.entity.Grupo;

/**
 * Interfaz de navegación (Navigator/Listener) implementada por MainActivity.
 * Los Fragmentos la usan para solicitar transiciones sin acoplarse a la actividad.
 *
 * Flujo: GruposFragment → AlumnosFragment → AsistenciasFragment
 */
public interface Navigator {

    /**
     * Navegar desde la lista de grupos hacia la lista de alumnos del grupo seleccionado.
     * @param grupo el grupo seleccionado por el usuario
     */
    void navigateToAlumnos(Grupo grupo);

    /**
     * Navegar desde la lista de alumnos hacia el historial de asistencias del grupo.
     * @param grupoId ID del grupo activo
     * @param grupoNombre nombre del grupo para mostrarlo en el título
     */
    void navigateToAsistencias(long grupoId, String grupoNombre);

    /**
     * Volver al fragmento anterior en la pila de retroceso.
     */
    void navigateBack();
}
