// ═══════════════════════════════════════════════════════════════════════════
// AsistenciaDaoTest.java  (src/androidTest/)
// Prueba de integración con Room in-memory database
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude;

import static org.junit.Assert.*;

import android.content.Context;

import androidx.arch.core.executor.testing.InstantTaskExecutorRule;
import androidx.room.Room;
import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import com.example.clase12_ia_claude.LiveDataTestUtil;
import com.example.clase12_ia_claude.data.dao.AlumnoDao;
import com.example.clase12_ia_claude.data.dao.AsistenciaDao;
import com.example.clase12_ia_claude.data.dao.GrupoDao;
import com.example.clase12_ia_claude.data.db.AppDatabase;
import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;
import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.data.relations.AsistenciaDetalle;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.List;

@RunWith(AndroidJUnit4.class)
public class AsistenciaDaoTest {

    @Rule
    public InstantTaskExecutorRule instantTaskExecutorRule = new InstantTaskExecutorRule();

    private AppDatabase db;
    private AlumnoDao alumnoDao;
    private GrupoDao grupoDao;
    private AsistenciaDao asistenciaDao;

    @Before
    public void createDb() {
        Context ctx = ApplicationProvider.getApplicationContext();
        db = Room.inMemoryDatabaseBuilder(ctx, AppDatabase.class)
                .allowMainThreadQueries()
                .build();
        alumnoDao = db.alumnoDao();
        grupoDao = db.grupoDao();
        asistenciaDao = db.asistenciaDao();
    }

    @After
    public void closeDb() {
        db.close();
    }

    // ── Helper ────────────────────────────────────────────────────────────

    private long insertAlumno(String nombre, String apellido) {
        return alumnoDao.insertAlumno(new Alumno(nombre, apellido, "001", "test@test.com"));
    }

    private long insertGrupo(String nombre) {
        return grupoDao.insertGrupo(new Grupo(nombre, "Desc", "Lun 08:00", "2024-1"));
    }

    // ── Tests ─────────────────────────────────────────────────────────────

    @Test
    public void insertAndReadAsistencia_returnsCorrectRecord() throws Exception {
        // Arrange
        long alumnoId = insertAlumno("Ana", "García");
        long grupoId = insertGrupo("Matemáticas");
        alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(alumnoId, grupoId, "2024-01-10"));

        Asistencia asistencia = new Asistencia(alumnoId, grupoId, "2024-03-10", true, null);

        // Act
        asistenciaDao.insertAsistencia(asistencia);
        List<AsistenciaDetalle> result =
                LiveDataTestUtil.getValue(asistenciaDao.getAsistenciasByGrupo(grupoId));

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Ana García", result.get(0).nombreAlumno);
        assertEquals("2024-03-10", result.get(0).fecha);
        assertTrue(result.get(0).presente);
    }

    @Test
    public void multipleAsistencias_countPresenciasCorrectly() throws Exception {
        // Arrange
        long alumnoId = insertAlumno("Carlos", "López");
        long grupoId = insertGrupo("Programación");
        alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(alumnoId, grupoId, "2024-01-10"));

        asistenciaDao.insertAsistencia(new Asistencia(alumnoId, grupoId, "2024-03-04", true, null));
        asistenciaDao.insertAsistencia(new Asistencia(alumnoId, grupoId, "2024-03-06", true, null));
        asistenciaDao.insertAsistencia(new Asistencia(alumnoId, grupoId, "2024-03-11", false, "Enfermedad"));

        // Act
        Integer presencias = LiveDataTestUtil.getValue(
                asistenciaDao.countPresencias(alumnoId, grupoId)
        );

        // Assert
        assertNotNull(presencias);
        assertEquals(2, (int) presencias);  // Dos presentes, una ausencia
    }

    @Test
    public void deleteAlumno_cascadeDeletesAsistencias() throws Exception {
        // Arrange
        long alumnoId = insertAlumno("María", "Martínez");
        long grupoId = insertGrupo("Base de Datos");
        alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(alumnoId, grupoId, "2024-01-10"));
        asistenciaDao.insertAsistencia(new Asistencia(alumnoId, grupoId, "2024-03-05", true, null));

        Alumno alumno = new Alumno("María", "Martínez", "001", "m@test.com");
        alumno.alumnoId = alumnoId;

        // Act – DELETE en cascada
        alumnoDao.deleteAlumno(alumno);

        List<AsistenciaDetalle> result =
                LiveDataTestUtil.getValue(asistenciaDao.getAsistenciasByGrupo(grupoId));

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    public void manyToMany_alumnoInMultipleGroups() throws Exception {
        // Arrange
        long alumnoId = insertAlumno("Luis", "Hernández");
        long g1 = insertGrupo("Física");
        long g2 = insertGrupo("Química");

        alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(alumnoId, g1, "2024-01-10"));
        alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(alumnoId, g2, "2024-01-10"));

        // Act
        List<Alumno> alumnosG1 =
                LiveDataTestUtil.getValue(alumnoDao.getAlumnosByGrupo(g1));
        List<Alumno> alumnosG2 =
                LiveDataTestUtil.getValue(alumnoDao.getAlumnosByGrupo(g2));

        // Assert – El mismo alumno aparece en ambos grupos
        assertEquals(1, alumnosG1.size());
        assertEquals(1, alumnosG2.size());
        assertEquals(alumnoId, alumnosG1.get(0).alumnoId);
        assertEquals(alumnoId, alumnosG2.get(0).alumnoId);
    }
}
