package com.example.clase12_ia_claude.data.repository;

import android.app.Application;

import androidx.lifecycle.LiveData;

import com.example.clase12_ia_claude.data.dao.AlumnoDao;
import com.example.clase12_ia_claude.data.db.AppDatabase;
import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;

import java.util.List;

public class AlumnoRepository {

    private final AlumnoDao alumnoDao;

    public AlumnoRepository(Application application) {
        AppDatabase db = AppDatabase.getDatabase(application);
        alumnoDao = db.alumnoDao();
    }

    public LiveData<List<Alumno>> getAllAlumnos() {
        return alumnoDao.getAllAlumnos();
    }

    public LiveData<List<Alumno>> getAlumnosByGrupo(long grupoId) {
        return alumnoDao.getAlumnosByGrupo(grupoId);
    }

    public void insert(Alumno alumno) {
        AppDatabase.databaseWriteExecutor.execute(() -> alumnoDao.insertAlumno(alumno));
    }

    public void inscribir(long alumnoId, long grupoId, String fecha) {
        AppDatabase.databaseWriteExecutor.execute(() ->
            alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(alumnoId, grupoId, fecha))
        );
    }

    public void update(Alumno alumno) {
        AppDatabase.databaseWriteExecutor.execute(() -> alumnoDao.updateAlumno(alumno));
    }

    public void delete(Alumno alumno) {
        AppDatabase.databaseWriteExecutor.execute(() -> alumnoDao.deleteAlumno(alumno));
    }
}
