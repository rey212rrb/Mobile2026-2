package com.example.clase10;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

@Database(entities = {User.class}, version = 1)
public abstract class AppDataBase extends RoomDatabase {
    private static AppDataBase instance;

    private static String database = "database-name";

    public static AppDataBase getInstance(Context context){

        if(instance == null){

            instance = Room.databaseBuilder(context,
                    AppDataBase.class, database).build();

        }

        return instance;

    }

    public abstract UserDao userDao();

}
