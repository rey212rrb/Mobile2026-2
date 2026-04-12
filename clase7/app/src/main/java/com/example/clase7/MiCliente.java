package com.example.clase7;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MiCliente {

    private String url = "https://function-bun-production-46fa.up.railway.app/";
    OkHttpClient client = new OkHttpClient();

    public ArrayList<String> getElements(){

        Request request = new Request.Builder()
                .url(url)
                .build();

        try (Response response = client.newCall(request).execute()) {
            String respuesta =  response.body().string();

            ArrayList<String> elementos = new ArrayList<>();
            JSONObject jsonObject = new JSONObject(respuesta);
            JSONArray array = jsonObject.getJSONArray("characteres");

            for (int i = 0; i < array.length(); i++){

                String elemento = array.getString(i);
                elementos.add(elemento);

            }

            //Log.i("Rey", respuesta);
            return elementos;
        }catch (IOException e){

            throw new RuntimeException(e);

        }catch (JSONException e){

            throw new RuntimeException(e);

        }

    }

    public void addElement(String nombre){

        final okhttp3.MediaType JSON = okhttp3.MediaType.get("application/json; charset=utf-8");

        String jsonString = "{\"characteres\":\"" + nombre + "\"}";
        okhttp3.RequestBody body = okhttp3.RequestBody.create(jsonString, JSON);

        Request request = new Request.Builder()
                .url(url + "add")
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                Log.e("MiCliente", "Error al enviar: " + response.code());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    }

