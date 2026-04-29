package com.example.clase12;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "alumnos")

public class Alumno {

    @PrimaryKey(autoGenerate = true)

    public int id;
    public String nombre;
    public String apellidoPaterno;
    public String apellidoMaterno;
    public String numeroDeCuenta;

    public int idCurso;


}
