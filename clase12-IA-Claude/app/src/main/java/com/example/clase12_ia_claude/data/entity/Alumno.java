package com.example.clase12_ia_claude.data.entity;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

/**
 * Entidad que representa a un Alumno en la base de datos.
 */
@Entity(tableName = "alumnos")
public class Alumno {

    @PrimaryKey(autoGenerate = true)
    public long alumnoId;

    public String nombre;
    public String apellido;
    public String matricula;
    public String email;

    public Alumno(String nombre, String apellido, String matricula, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.email = email;
    }

    public String getNombreCompleto() {
        return nombre + " " + apellido;
    }
}
