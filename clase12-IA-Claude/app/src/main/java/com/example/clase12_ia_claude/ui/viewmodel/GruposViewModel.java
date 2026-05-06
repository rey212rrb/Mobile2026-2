// ═══════════════════════════════════════════════════════════════════════════
// GruposViewModel.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.ui.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Transformations;

import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.data.repository.GrupoRepository;
import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;
import com.example.clase12_ia_claude.data.repository.AlumnoRepository;
import com.example.clase12_ia_claude.data.repository.AsistenciaRepository;

import java.text.SimpleDateFormat;
import java.util.List;

public class GruposViewModel extends AndroidViewModel {

    private final GrupoRepository repository;
    public final LiveData<List<Grupo>> grupos;

    public GruposViewModel(@NonNull Application application) {
        super(application);
        repository = new GrupoRepository(application);
        grupos = repository.getAllGrupos();
    }

    public void insertGrupo(Grupo grupo) {
        repository.insert(grupo);
    }

    public void deleteGrupo(Grupo grupo) {
        repository.delete(grupo);
    }

    public LiveData<Integer> getAlumnoCount(long grupoId) {
        return repository.countAlumnosByGrupo(grupoId);
    }
}





