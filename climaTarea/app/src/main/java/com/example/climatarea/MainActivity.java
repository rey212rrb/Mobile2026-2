package com.example.climatarea;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private final String API_KEY = "709f2f4570a77394dc5fc110846ced75";
    private RecyclerView recyclerView;
    private WeatherAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.rvWeather);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        obtenerClimaDeAPI();

        mostrarHistorial();
    }
        private void obtenerClimaDeAPI() {
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl("https://api.openweathermap.org/data/2.5/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

        WeatherApiService service = retrofit.create(WeatherApiService.class);

        service.getCurrentWeather("Mexico City", API_KEY, "metric").enqueue(new Callback<WeatherResponse>() {
            @Override
            public void onResponse(Call<WeatherResponse> call, Response<WeatherResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    double temp = response.body().main.temp;
                    String desc = response.body().weather.get(0).description;

                    guardarEnHistórico(temp, desc);
                }
            }

            @Override
            public void onFailure(Call<WeatherResponse> call, Throwable t) {
                Log.e("Clima", "Error: " + t.getMessage());
            }
        });
    }

    private void mostrarHistorial() {
        AsyncTask.execute(() -> {
            AppDatabase db = AppDatabase.getInstance(getApplicationContext());
            java.util.List<WeatherEntity> lista = db.weatherDao().getAllHistory();

            runOnUiThread(() -> {
                adapter = new WeatherAdapter(lista);
                recyclerView.setAdapter(adapter);
            });
        });
    }
    private void guardarEnHistórico(double temp, String desc) {
        AsyncTask.execute(() -> {
            AppDatabase db = AppDatabase.getInstance(getApplicationContext());

            db.weatherDao().insertWeather(new WeatherEntity("2026-04-19", "Domingo", temp, desc));

            db.weatherDao().insertWeather(new WeatherEntity("2026-04-18", "Sábado", 22.5, "Despejado"));

            Log.i("Clima", "Histórico actualizado con éxito");
        });
    }
}