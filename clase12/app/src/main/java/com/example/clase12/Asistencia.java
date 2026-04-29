package com.example.clase12;

import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.Index;
import androidx.room.PrimaryKey;

@Entity(tableName = "asistencias",
        indices = {@Index("idCurso"), @Index("idAlumno")}, // Evita que Room se queje del rendimiento
        foreignKeys = {
                @ForeignKey(entity = Curso.class, parentColumns = "id", childColumns = "idCurso", onDelete = ForeignKey.CASCADE),
                @ForeignKey(entity = Alumno.class, parentColumns = "id", childColumns = "idAlumno", onDelete = ForeignKey.CASCADE)
        })
public class Asistencia {
    @PrimaryKey(autoGenerate = true)
    public int id;
    public int idCurso;
    public int idAlumno;
    public String fecha;
}