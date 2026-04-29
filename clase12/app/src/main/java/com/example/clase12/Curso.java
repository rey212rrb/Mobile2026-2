package com.example.clase12;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "cursos")

public class Curso {

    @PrimaryKey(autoGenerate = true)

    public int id;
    public String nombreCurso;
}
