// ═══════════════════════════════════════════════════════════════════════════
// AlumnoDao.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.*;

import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;
import com.example.clase12_ia_claude.data.relations.AlumnoConGrupos;

import java.util.List;

@Dao
public interface AlumnoDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long insertAlumno(Alumno alumno);

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    void insertCrossRef(AlumnoGrupoCrossRef crossRef);

    @Update
    void updateAlumno(Alumno alumno);

    @Delete
    void deleteAlumno(Alumno alumno);

    @Query("SELECT * FROM alumnos WHERE alumnoId = :id")
    LiveData<Alumno> getAlumnoById(long id);

    @Query("SELECT * FROM alumnos ORDER BY apellido, nombre")
    LiveData<List<Alumno>> getAllAlumnos();

    /**
     * Devuelve todos los alumnos inscritos en un grupo específico (Many-to-Many).
     */
    @Query("SELECT a.* FROM alumnos a " +
           "INNER JOIN alumno_grupo_cross_ref cr ON a.alumnoId = cr.alumnoId " +
           "WHERE cr.grupoId = :grupoId ORDER BY a.apellido, a.nombre")
    LiveData<List<Alumno>> getAlumnosByGrupo(long grupoId);

    @Transaction
    @Query("SELECT * FROM alumnos WHERE alumnoId = :alumnoId")
    LiveData<AlumnoConGrupos> getAlumnoConGrupos(long alumnoId);
}
