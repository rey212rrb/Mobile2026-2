// ═══════════════════════════════════════════════════════════════════════════
// AlumnosViewModel.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.ui.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Transformations;

import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.repository.AlumnoRepository;

import java.util.List;

public class AlumnosViewModel extends AndroidViewModel {

    private final AlumnoRepository repository;
    private final MutableLiveData<Long> grupoIdLive = new MutableLiveData<>();

    public final LiveData<List<Alumno>> alumnos;

    public AlumnosViewModel(@NonNull Application application) {
        super(application);
        repository = new AlumnoRepository(application);
        // Transformación reactiva: cuando cambia grupoId, se actualiza la lista
        alumnos = Transformations.switchMap(grupoIdLive, repository::getAlumnosByGrupo);
    }

    /** Llamar con el grupoId seleccionado en GruposFragment. */
    public void setGrupoId(long grupoId) {
        grupoIdLive.setValue(grupoId);
    }

    public long getCurrentGrupoId() {
        return grupoIdLive.getValue() != null ? grupoIdLive.getValue() : -1;
    }

    public void insertAlumno(Alumno alumno) {
        repository.insert(alumno);
    }

    public void deleteAlumno(Alumno alumno) {
        repository.delete(alumno);
    }
}
