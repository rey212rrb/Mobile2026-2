package com.example.clase10;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        AsyncTask.execute(() -> {
            try {
                UserDao userDao = AppDataBase.getInstance(this).userDao();
                userDao.insertAll(new User(0, "Maria", "Felix"));
                List<User> usuarios = userDao.getAll();
                runOnUiThread(() -> {
                    for (User user : usuarios) {
                        Log.i("Rey", "Usuario: " + user.firstName + " " + user.lastName + " (ID: " + user.uid + ")");
                    }
                });
            }catch (Exception e) {
                // Esto te dirá en el Logcat exactamente qué falló sin cerrar la app
                Log.e("Rey", "Error en Base de Datos: " + e.getMessage());
            }

        });
    }
}