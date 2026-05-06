package com.example.clase12_ia_claude.data.entity;

import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.Index;
import androidx.room.PrimaryKey;

/**
 * Entidad Asistencia.
 * Relación: Un alumno inscrito en un grupo puede tener MUCHAS asistencias.
 * Referencia la inscripción mediante alumnoId + grupoId.
 */
@Entity(
    tableName = "asistencias",
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
public class Asistencia {

    @PrimaryKey(autoGenerate = true)
    public long asistenciaId;

    public long alumnoId;
    public long grupoId;

    public String fecha;       // ISO-8601: "2024-03-10"
    public boolean presente;   // true = presente, false = ausente
    public String observacion; // Nota opcional

    public Asistencia(long alumnoId, long grupoId, String fecha,
                      boolean presente, String observacion) {
        this.alumnoId = alumnoId;
        this.grupoId = grupoId;
        this.fecha = fecha;
        this.presente = presente;
        this.observacion = observacion;
    }
}
