package com.example.clase12_ia_claude.data.entity;

import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.Index;

/**
 * Tabla de unión (junction table) para la relación Muchos a Muchos
 * entre Alumno y Grupo.
 * Un alumno puede estar inscrito en varios grupos y viceversa.
 */
@Entity(
    tableName = "alumno_grupo_cross_ref",
    primaryKeys = {"alumnoId", "grupoId"},
    foreignKeys = {
        @ForeignKey(
            entity = Alumno.class,
            parentColumns = "alumnoId",
            childColumns = "alumnoId",
            onDelete = ForeignKey.CASCADE
        ),
        @ForeignKey(
            entity = Grupo.class,
            parentColumns = "grupoId",
            childColumns = "grupoId",
            onDelete = ForeignKey.CASCADE
        )
    },
    indices = {
        @Index("alumnoId"),
        @Index("grupoId")
    }
)
public class AlumnoGrupoCrossRef {

    public long alumnoId;
    public long grupoId;
    public String fechaInscripcion; // ISO-8601: "2024-01-15"

    public AlumnoGrupoCrossRef(long alumnoId, long grupoId, String fechaInscripcion) {
        this.alumnoId = alumnoId;
        this.grupoId = grupoId;
        this.fechaInscripcion = fechaInscripcion;
    }
}
