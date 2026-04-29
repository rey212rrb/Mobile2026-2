package com.example.clase12;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

@Database(entities = {Alumno.class, Curso.class, Asistencia.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {

    public abstract AlumnoDAO alumnoDAO();
    public abstract CursoDAO cursoDAO();
    public abstract AsistenciaDAO asistenciaDAO();

    private static AppDatabase instancia;

    public static AppDatabase getInstance(Context context){

        if(instancia == null){

            instancia = Room.databaseBuilder(context.getApplicationContext(),
                    AppDatabase.class, "cursosBD")

                    .fallbackToDestructiveMigration()
                    .build();

        }
        return instancia;
    }

}
