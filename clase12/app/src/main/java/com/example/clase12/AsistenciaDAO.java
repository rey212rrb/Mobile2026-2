package com.example.clase12;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import java.util.List;

@Dao
public interface AsistenciaDAO {

    @Insert
    void registrarAsistencia(Asistencia asistencia);

    @Query("SELECT * FROM asistencias WHERE idAlumno = :aluId AND idCurso = :curId")
    LiveData<List<Asistencia>> obtenerAsistenciasPorAlumno(int aluId, int curId);

    @Query("SELECT alumnos.nombre AS nombreAlumno, cursos.nombreCurso AS nombreCurso, asistencias.fecha " +
            "FROM asistencias " +
            "INNER JOIN alumnos ON asistencias.idAlumno = alumnos.id " +
            "INNER JOIN cursos ON asistencias.idCurso = cursos.id")
    LiveData<List<AsistenciaReporte>> obtenerReporteAsistencia();
}