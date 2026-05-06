package com.example.clase12_ia_claude.data.entity;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

/**
 * Entidad que representa un Grupo/Curso en la base de datos.
 */
@Entity(tableName = "grupos")
public class Grupo {

    @PrimaryKey(autoGenerate = true)
    public long grupoId;

    public String nombre;        // e.g. "Matemáticas 101"
    public String descripcion;
    public String horario;       // e.g. "Lunes y Miércoles 10:00-12:00"
    public String semestre;

    public Grupo(String nombre, String descripcion, String horario, String semestre) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.horario = horario;
        this.semestre = semestre;
    }
}
