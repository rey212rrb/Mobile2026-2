package com.example.clase12;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface AlumnoDAO {

    @Insert
    void insertar(Alumno alumno);

    @Query("SELECT * FROM alumnos WHERE idCurso = :cursoId")
    LiveData<List<Alumno>> obtenerAlumnosPorCurso(int cursoId);

    @Query("SELECT * FROM alumnos ORDER BY nombre ASC")
    LiveData<List<Alumno>> obtenerTodos();

}
