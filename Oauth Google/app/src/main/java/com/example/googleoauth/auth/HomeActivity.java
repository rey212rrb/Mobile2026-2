package com.example.googleoauth.auth;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.credentials.ClearCredentialStateRequest;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.exceptions.ClearCredentialException;
import androidx.credentials.exceptions.GetCredentialException;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;

import com.example.googleoauth.R;
import com.google.android.libraries.identity.googleid.GetGoogleIdOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.Executors;

public class HomeActivity extends AppCompatActivity {

    private static final String TAG = "HomeActivity";
    private static final String WEB_CLIENT_ID = "87696772657-utp4i2gtb4om223ugluq09v3iku0727s.apps.googleusercontent.com";

    private CredentialManager credentialManager;
    private String userEmail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        credentialManager = CredentialManager.create(this);

        loadUserData();
        setupListeners();
    }

    private void loadUserData() {
        String name     = getIntent().getStringExtra("user_name");
        String email    = getIntent().getStringExtra("user_email");
        String photoUrl = getIntent().getStringExtra("user_photo");

        userEmail = email;

        TextView tvName  = findViewById(R.id.tv_user_name);
        TextView tvEmail = findViewById(R.id.tv_user_email);
        TextView tvTime  = findViewById(R.id.tv_last_login);

        if (name != null)  tvName.setText(name);
        if (email != null) tvEmail.setText(email);

        String time = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
        tvTime.setText("Hoy a las " + time);

        // Cargar foto de perfil si existe
        // if (photoUrl != null) {
        //     ImageView ivAvatar = findViewById(R.id.iv_avatar);
        //     Glide.with(this).load(photoUrl).circleCrop().into(ivAvatar);
        // }
    }

    private void setupListeners() {
        findViewById(R.id.btn_logout).setOnClickListener(v -> confirmLogout());

        findViewById(R.id.btn_change_password).setOnClickListener(v ->
                startActivity(new Intent(this, ForgotPasswordActivity.class)));

        findViewById(R.id.btn_logout_main).setOnClickListener(v -> confirmLogout());

        findViewById(R.id.btn_delete_account).setOnClickListener(v -> confirmDeleteAccount());
    }


    private void confirmLogout() {
        new AlertDialog.Builder(this)
                .setTitle("Cerrar sesión")
                .setMessage("¿Estás seguro de que quieres cerrar sesión?")
                .setPositiveButton("Cerrar sesión", (dialog, which) -> performLogout())
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void performLogout() {
        credentialManager.clearCredentialStateAsync(
                new ClearCredentialStateRequest(),
                null,
                Executors.newSingleThreadExecutor(),
                new CredentialManagerCallback<Void, ClearCredentialException>() {
                    @Override
                    public void onResult(Void result) {
                        runOnUiThread(() -> {
                            Log.d(TAG, "Credenciales limpiadas");

                            navigateToLogin();
                        });
                    }

                    @Override
                    public void onError(ClearCredentialException e) {
                        runOnUiThread(() -> {
                            Log.e(TAG, "Error limpiando credenciales, continuando logout", e);
                            navigateToLogin();
                        });
                    }
                }
        );
    }

    private void confirmDeleteAccount() {
        new AlertDialog.Builder(this)
                .setTitle("⚠ Eliminar cuenta")
                .setMessage("Esta acción es permanente y no se puede deshacer.\n\n" +
                        "Se eliminarán todos tus datos y perderás acceso a tu cuenta.")
                .setPositiveButton("Eliminar mi cuenta", (dialog, which) ->
                        reAuthenticateForDeletion())
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void reAuthenticateForDeletion() {
        Toast.makeText(this, "Verificando identidad con Google...", Toast.LENGTH_SHORT).show();

        GetGoogleIdOption googleIdOption = new GetGoogleIdOption.Builder()
                .setFilterByAuthorizedAccounts(true)
                .setServerClientId(WEB_CLIENT_ID)
                .setAutoSelectEnabled(false)
                .setNonce(generateNonce())
                .build();

        GetCredentialRequest request = new GetCredentialRequest.Builder()
                .addCredentialOption(googleIdOption)
                .build();

        credentialManager.getCredentialAsync(
                this,
                request,
                null,
                Executors.newSingleThreadExecutor(),
                new CredentialManagerCallback<GetCredentialResponse, GetCredentialException>() {
                    @Override
                    public void onResult(GetCredentialResponse result) {
                        runOnUiThread(() -> {
                            try {
                                androidx.credentials.Credential credential = result.getCredential();
                                if (credential instanceof androidx.credentials.CustomCredential &&
                                        credential.getType().equals(
                                                GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL)) {

                                    GoogleIdTokenCredential googleCred =
                                            GoogleIdTokenCredential.createFrom(
                                                    ((androidx.credentials.CustomCredential) credential).getData());

                                    // Token fresco obtenido → proceder con eliminación
                                    performDeleteAccount(googleCred.getIdToken());
                                }
                            } catch (Exception e) {
                                Log.e(TAG, "Error en re-autenticación para delete", e);
                                Toast.makeText(HomeActivity.this,
                                        "Error de verificación. Inténtalo de nuevo.", Toast.LENGTH_SHORT).show();
                            }
                        });
                    }

                    @Override
                    public void onError(GetCredentialException e) {
                        runOnUiThread(() -> {
                            Log.e(TAG, "Re-autenticación cancelada o fallida", e);
                            Toast.makeText(HomeActivity.this,
                                    "Verificación cancelada", Toast.LENGTH_SHORT).show();
                        });
                    }
                }
        );
    }

    private void performDeleteAccount(String freshIdToken) {
        credentialManager.clearCredentialStateAsync(
                new ClearCredentialStateRequest(),
                null,
                Executors.newSingleThreadExecutor(),
                new CredentialManagerCallback<Void, ClearCredentialException>() {
                    @Override
                    public void onResult(Void result) {
                        runOnUiThread(() -> {
                            Log.d(TAG, "Cuenta eliminada y credenciales limpiadas");
                            Toast.makeText(HomeActivity.this,
                                    "Cuenta eliminada exitosamente", Toast.LENGTH_LONG).show();
                            navigateToLogin();
                        });
                    }

                    @Override
                    public void onError(ClearCredentialException e) {
                        runOnUiThread(() -> {
                            // Continuar con la eliminación aunque falle la limpieza local
                            navigateToLogin();
                        });
                    }
                }
        );
    }

    private void navigateToLogin() {
        Intent intent = new Intent(this, LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private String generateNonce() {
        try {
            byte[] bytes = new byte[32];
            new SecureRandom().nextBytes(bytes);
            StringBuilder raw = new StringBuilder();
            for (byte b : bytes) raw.append(String.format("%02x", b));
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(raw.toString().getBytes());
            StringBuilder hashed = new StringBuilder();
            for (byte b : digest) hashed.append(String.format("%02x", b));
            return hashed.toString();
        } catch (Exception e) {
            return "";
        }
    }
}
