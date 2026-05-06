// ═══════════════════════════════════════════════════════════════════════════
// AlumnoRepository.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.data.repository;

import android.app.Application;

import androidx.lifecycle.LiveData;

import com.example.clase12_ia_claude.data.dao.AlumnoDao;
import com.example.clase12_ia_claude.data.dao.AsistenciaDao;
import com.example.clase12_ia_claude.data.db.AppDatabase;
import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;
import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;

import java.util.List;


// ═══════════════════════════════════════════════════════════════════════════
// AsistenciaRepository.java
// ═══════════════════════════════════════════════════════════════════════════
import android.app.Application;

import androidx.lifecycle.LiveData;

import com.example.clase12_ia_claude.data.dao.AsistenciaDao;
import com.example.clase12_ia_claude.data.db.AppDatabase;
import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;

import java.util.List;

public class AsistenciaRepository {

    private final AsistenciaDao asistenciaDao;

    public AsistenciaRepository(Application application) {
        AppDatabase db = AppDatabase.getDatabase(application);
        asistenciaDao = db.asistenciaDao();
    }

    public LiveData<List<AsistenciaDetalle>> getAsistenciasByGrupo(long grupoId) {
        return asistenciaDao.getAsistenciasByGrupo(grupoId);
    }

    public LiveData<List<AsistenciaDetalle>> getAsistenciasByAlumnoYGrupo(long alumnoId, long grupoId) {
        return asistenciaDao.getAsistenciasByAlumnoYGrupo(alumnoId, grupoId);
    }

    public void insert(Asistencia asistencia) {
        AppDatabase.databaseWriteExecutor.execute(() ->
            asistenciaDao.insertAsistencia(asistencia)
        );
    }

    public void update(Asistencia asistencia) {
        AppDatabase.databaseWriteExecutor.execute(() ->
            asistenciaDao.updateAsistencia(asistencia)
        );
    }

    public void delete(Asistencia asistencia) {
        AppDatabase.databaseWriteExecutor.execute(() ->
            asistenciaDao.deleteAsistencia(asistencia)
        );
    }

    public LiveData<Integer> countPresencias(long alumnoId, long grupoId) {
        return asistenciaDao.countPresencias(alumnoId, grupoId);
    }
}
