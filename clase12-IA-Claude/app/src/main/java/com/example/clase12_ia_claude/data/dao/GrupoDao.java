package com.example.clase12_ia_claude.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.*;

import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.data.relations.GrupoConAlumnos;

import java.util.List;

@Dao
public interface GrupoDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long insertGrupo(Grupo grupo);

    @Update
    void updateGrupo(Grupo grupo);

    @Delete
    void deleteGrupo(Grupo grupo);

    @Query("SELECT * FROM grupos WHERE grupoId = :id")
    LiveData<Grupo> getGrupoById(long id);

    @Query("SELECT * FROM grupos ORDER BY nombre")
    LiveData<List<Grupo>> getAllGrupos();

    /**
     * Devuelve un grupo con la lista completa de alumnos inscritos (Many-to-Many).
     */
    @Transaction
    @Query("SELECT * FROM grupos WHERE grupoId = :grupoId")
    LiveData<GrupoConAlumnos> getGrupoConAlumnos(long grupoId);

    @Transaction
    @Query("SELECT * FROM grupos ORDER BY nombre")
    LiveData<List<GrupoConAlumnos>> getAllGruposConAlumnos();

    @Query("SELECT COUNT(*) FROM alumno_grupo_cross_ref WHERE grupoId = :grupoId")
    LiveData<Integer> countAlumnosByGrupo(long grupoId);
}
