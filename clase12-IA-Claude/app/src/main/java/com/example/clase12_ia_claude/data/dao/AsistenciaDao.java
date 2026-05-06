package com.example.clase12_ia_claude.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.*;

import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;

import java.util.List;

@Dao
public interface AsistenciaDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long insertAsistencia(Asistencia asistencia);

    @Update
    void updateAsistencia(Asistencia asistencia);

    @Delete
    void deleteAsistencia(Asistencia asistencia);

    @Query("SELECT * FROM asistencias WHERE asistenciaId = :id")
    LiveData<Asistencia> getAsistenciaById(long id);

    /**
     * Devuelve el historial de asistencias de un alumno en un grupo (One-to-Many).
     * JOIN con alumnos y grupos para mostrar nombres en la UI.
     */
    @Query("SELECT " +
           "  asi.asistenciaId, " +
           "  (a.nombre || ' ' || a.apellido) AS nombreAlumno, " +
           "  g.nombre AS nombreGrupo, " +
           "  asi.fecha, " +
           "  asi.presente, " +
           "  asi.observacion, " +
           "  asi.alumnoId, " +
           "  asi.grupoId " +
           "FROM asistencias asi " +
           "INNER JOIN alumnos a ON asi.alumnoId = a.alumnoId " +
           "INNER JOIN grupos g ON asi.grupoId = g.grupoId " +
           "WHERE asi.grupoId = :grupoId " +
           "ORDER BY asi.fecha DESC, a.apellido")
    LiveData<List<AsistenciaDetalle>> getAsistenciasByGrupo(long grupoId);

    /**
     * Historial de un alumno específico en un grupo específico.
     */
    @Query("SELECT " +
           "  asi.asistenciaId, " +
           "  (a.nombre || ' ' || a.apellido) AS nombreAlumno, " +
           "  g.nombre AS nombreGrupo, " +
           "  asi.fecha, " +
           "  asi.presente, " +
           "  asi.observacion, " +
           "  asi.alumnoId, " +
           "  asi.grupoId " +
           "FROM asistencias asi " +
           "INNER JOIN alumnos a ON asi.alumnoId = a.alumnoId " +
           "INNER JOIN grupos g ON asi.grupoId = g.grupoId " +
           "WHERE asi.alumnoId = :alumnoId AND asi.grupoId = :grupoId " +
           "ORDER BY asi.fecha DESC")
    LiveData<List<AsistenciaDetalle>> getAsistenciasByAlumnoYGrupo(long alumnoId, long grupoId);

    @Query("SELECT COUNT(*) FROM asistencias " +
           "WHERE alumnoId = :alumnoId AND grupoId = :grupoId AND presente = 1")
    LiveData<Integer> countPresencias(long alumnoId, long grupoId);
}
