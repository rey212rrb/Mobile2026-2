package com.example.clase12_ia_claude.data.db;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.sqlite.db.SupportSQLiteDatabase;

import com.example.clase12_ia_claude.data.dao.AlumnoDao;
import com.example.clase12_ia_claude.data.dao.AsistenciaDao;
import com.example.clase12_ia_claude.data.dao.GrupoDao;
import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;
import com.example.clase12_ia_claude.data.entity.Asistencia;
import com.example.clase12_ia_claude.data.entity.Grupo;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Clase principal de la base de datos Room.
 * Implementa el patrón Singleton para garantizar una única instancia.
 */
@Database(
    entities = {
        Alumno.class,
        Grupo.class,
        AlumnoGrupoCrossRef.class,
        Asistencia.class
    },
    version = 1,
    exportSchema = false
)
public abstract class AppDatabase extends RoomDatabase {

    private static volatile AppDatabase INSTANCE;
    private static final int NUMBER_OF_THREADS = 4;

    public static final ExecutorService databaseWriteExecutor =
            Executors.newFixedThreadPool(NUMBER_OF_THREADS);

    // DAOs
    public abstract AlumnoDao alumnoDao();
    public abstract GrupoDao grupoDao();
    public abstract AsistenciaDao asistenciaDao();

    public static AppDatabase getDatabase(final Context context) {
        if (INSTANCE == null) {
            synchronized (AppDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(
                            context.getApplicationContext(),
                            AppDatabase.class,
                            "attendance_database"
                    )
                    .addCallback(seedCallback)
                    .build();
                }
            }
        }
        return INSTANCE;
    }

    /**
     * Callback para insertar datos de ejemplo al crear la BD por primera vez.
     */
    private static final RoomDatabase.Callback seedCallback = new RoomDatabase.Callback() {
        @Override
        public void onCreate(@NonNull SupportSQLiteDatabase db) {
            super.onCreate(db);
            databaseWriteExecutor.execute(() -> {
                AppDatabase database = INSTANCE;

                GrupoDao grupoDao = database.grupoDao();
                AlumnoDao alumnoDao = database.alumnoDao();
                AsistenciaDao asistenciaDao = database.asistenciaDao();

                // Seed grupos
                long g1 = grupoDao.insertGrupo(
                    new Grupo("Matemáticas 101", "Álgebra básica", "Lun-Mié 08:00", "2024-1"));
                long g2 = grupoDao.insertGrupo(
                    new Grupo("Programación Java", "Fundamentos de Java", "Mar-Jue 10:00", "2024-1"));
                long g3 = grupoDao.insertGrupo(
                    new Grupo("Base de Datos", "SQL y diseño relacional", "Vie 14:00", "2024-1"));

                // Seed alumnos
                long a1 = alumnoDao.insertAlumno(new Alumno("Ana", "García", "20240001", "ana@escuela.mx"));
                long a2 = alumnoDao.insertAlumno(new Alumno("Carlos", "López", "20240002", "carlos@escuela.mx"));
                long a3 = alumnoDao.insertAlumno(new Alumno("María", "Martínez", "20240003", "maria@escuela.mx"));
                long a4 = alumnoDao.insertAlumno(new Alumno("Luis", "Hernández", "20240004", "luis@escuela.mx"));

                // Inscripciones (Muchos a Muchos)
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a1, g1, "2024-01-15"));
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a1, g2, "2024-01-15"));
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a2, g1, "2024-01-16"));
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a2, g2, "2024-01-16"));
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a2, g3, "2024-01-16"));
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a3, g1, "2024-01-17"));
                alumnoDao.insertCrossRef(new AlumnoGrupoCrossRef(a4, g3, "2024-01-18"));

                // Asistencias de ejemplo (Uno a Muchos)
                asistenciaDao.insertAsistencia(new Asistencia(a1, g1, "2024-03-04", true, null));
                asistenciaDao.insertAsistencia(new Asistencia(a1, g1, "2024-03-06", true, null));
                asistenciaDao.insertAsistencia(new Asistencia(a1, g1, "2024-03-11", false, "Enfermedad"));
                asistenciaDao.insertAsistencia(new Asistencia(a2, g1, "2024-03-04", true, null));
                asistenciaDao.insertAsistencia(new Asistencia(a2, g1, "2024-03-06", false, null));
                asistenciaDao.insertAsistencia(new Asistencia(a3, g1, "2024-03-04", true, null));
                asistenciaDao.insertAsistencia(new Asistencia(a1, g2, "2024-03-05", true, null));
                asistenciaDao.insertAsistencia(new Asistencia(a2, g2, "2024-03-05", true, null));
            });
        }
    };
}
