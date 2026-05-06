// ═══════════════════════════════════════════════════════════════════════════
// AsistenciasViewModel.java
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude.ui.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Transformations;

import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;
import com.example.clase12_ia_claude.data.repository.AsistenciaRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class AsistenciasViewModel extends AndroidViewModel {

    private final AsistenciaRepository repository;
    private final MutableLiveData<Long> grupoIdLive = new MutableLiveData<>();

    public final LiveData<List<AsistenciaDetalle>> asistencias;

    public AsistenciasViewModel(@NonNull Application application) {
        super(application);
        repository = new AsistenciaRepository(application);
        asistencias = Transformations.switchMap(
                grupoIdLive, repository::getAsistenciasByGrupo
        );
    }

    public void setGrupoId(long grupoId) {
        grupoIdLive.setValue(grupoId);
    }

    public void registrarAsistencia(long alumnoId, long grupoId, boolean presente) {
        String hoy = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                .format(new Date());
        Asistencia a = new Asistencia(alumnoId, grupoId, hoy, presente, null);
        repository.insert(a);
    }

    public void deleteAsistencia(Asistencia asistencia) {
        repository.delete(asistencia);
    }

    public LiveData<Integer> getPresencias(long alumnoId, long grupoId) {
        return repository.countPresencias(alumnoId, grupoId);
    }
}