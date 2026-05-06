// ═══════════════════════════════════════════════════════════════════════════
// GrupoRepository.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.data.repository;

import android.app.Application;

import androidx.lifecycle.LiveData;

import com.example.clase12_ia_claude.data.dao.GrupoDao;
import com.example.clase12_ia_claude.data.db.AppDatabase;
import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.data.relations.GrupoConAlumnos;

import java.util.List;

public class GrupoRepository {

    private final GrupoDao grupoDao;
    public final LiveData<List<Grupo>> allGrupos;

    public GrupoRepository(Application application) {
        AppDatabase db = AppDatabase.getDatabase(application);
        grupoDao = db.grupoDao();
        allGrupos = grupoDao.getAllGrupos();
    }

    public LiveData<List<Grupo>> getAllGrupos() {
        return allGrupos;
    }

    public LiveData<GrupoConAlumnos> getGrupoConAlumnos(long grupoId) {
        return grupoDao.getGrupoConAlumnos(grupoId);
    }

    public void insert(Grupo grupo) {
        AppDatabase.databaseWriteExecutor.execute(() -> grupoDao.insertGrupo(grupo));
    }

    public void update(Grupo grupo) {
        AppDatabase.databaseWriteExecutor.execute(() -> grupoDao.updateGrupo(grupo));
    }

    public void delete(Grupo grupo) {
        AppDatabase.databaseWriteExecutor.execute(() -> grupoDao.deleteGrupo(grupo));
    }

    public LiveData<Integer> countAlumnosByGrupo(long grupoId) {
        return grupoDao.countAlumnosByGrupo(grupoId);
    }
}
