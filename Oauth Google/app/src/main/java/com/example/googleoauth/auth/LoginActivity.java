package com.example.googleoauth.auth;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;
import androidx.credentials.exceptions.GetCredentialException;
import androidx.credentials.exceptions.NoCredentialException;

import com.example.googleoauth.R;
import com.example.googleoauth.auth.ForgotPasswordActivity;
import com.example.googleoauth.auth.RegisterActivity;
import com.example.googleoauth.auth.HomeActivity;
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.concurrent.Executors;

public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LoginActivity";
    private static final String WEB_CLIENT_ID = "87696772657-utp4i2gtb4om223ugluq09v3iku0727s.apps.googleusercontent.com";

    private CredentialManager credentialManager;
    private TextInputLayout tilEmail, tilPassword;
    private TextInputEditText etEmail, etPassword;
    private View loadingOverlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        credentialManager = CredentialManager.create(this);

        bindViews();
        setupListeners();
    }

    private void bindViews() {
        tilEmail = findViewById(R.id.til_email);
        tilPassword = findViewById(R.id.til_password);
        etEmail = findViewById(R.id.et_email);
        etPassword = findViewById(R.id.et_password);
        loadingOverlay = findViewById(R.id.loading_overlay);
    }

    private void setupListeners() {
        View btnLogin = findViewById(R.id.btn_login);
        if (btnLogin != null) {
            btnLogin.setOnClickListener(v -> attemptEmailLogin());
        }

        View btnGoogle = findViewById(R.id.btn_google_login);
        if (btnGoogle != null) {
            btnGoogle.setOnClickListener(v -> launchGoogleLogin());
        }

        TextView tvForgot = findViewById(R.id.tv_forgot_password);
        if (tvForgot != null) {
            tvForgot.setOnClickListener(v ->
                    startActivity(new Intent(this, ForgotPasswordActivity.class)));
        }

        TextView tvGoRegister = findViewById(R.id.tv_go_register);
        if (tvGoRegister != null) {
            tvGoRegister.setOnClickListener(v ->
                    startActivity(new Intent(this, RegisterActivity.class)));
        }
    }

    private void launchGoogleLogin() {
        showLoading(true);
        try {
            GetSignInWithGoogleOption googleIdOption = new GetSignInWithGoogleOption.Builder(WEB_CLIENT_ID)
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
                            runOnUiThread(() -> handleGoogleCredential(result));
                        }

                        @Override
                        public void onError(GetCredentialException e) {
                            runOnUiThread(() -> {
                                showLoading(false);
                                if (e instanceof NoCredentialException) {
                                    Toast.makeText(LoginActivity.this,
                                            "No se encontraron cuentas de Google.", Toast.LENGTH_LONG).show();
                                } else {
                                    Log.e(TAG, "Error de Google Login", e);
                                    Toast.makeText(LoginActivity.this,
                                            "Error al iniciar sesión: " + e.getMessage(), Toast.LENGTH_LONG).show();
                                }
                            });
                        }
                    }
            );
        } catch (Exception e) {
            showLoading(false);
            Log.e(TAG, "Error al configurar Google", e);
        }
    }

    private void handleGoogleCredential(GetCredentialResponse result) {
        try {
            androidx.credentials.Credential credential = result.getCredential();
            if (credential instanceof androidx.credentials.CustomCredential &&
                    credential.getType().equals(GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL)) {

                GoogleIdTokenCredential googleIdToken = GoogleIdTokenCredential.createFrom(
                        ((androidx.credentials.CustomCredential) credential).getData());

                sendTokenToBackend(googleIdToken.getIdToken(), googleIdToken.getDisplayName(), googleIdToken.getId(),
                        googleIdToken.getProfilePictureUri() != null ? googleIdToken.getProfilePictureUri().toString() : null);
            } else {
                showLoading(false);
                Toast.makeText(this, "Tipo de credencial no soportado", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            showLoading(false);
            Log.e(TAG, "Error procesando credencial", e);
        }
    }

    private void attemptEmailLogin() {
        boolean valid = true;
        if (tilEmail != null) tilEmail.setError(null);
        if (tilPassword != null) tilPassword.setError(null);

        String email = etEmail != null && etEmail.getText() != null ? etEmail.getText().toString().trim() : "";
        String pass  = etPassword != null && etPassword.getText() != null ? etPassword.getText().toString() : "";

        if (TextUtils.isEmpty(email)) {
            if (tilEmail != null) tilEmail.setError("Ingresa tu correo electrónico");
            valid = false;
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            if (tilEmail != null) tilEmail.setError("Correo no válido");
            valid = false;
        }

        if (TextUtils.isEmpty(pass)) {
            if (tilPassword != null) tilPassword.setError("Ingresa tu contraseña");
            valid = false;
        } else if (pass.length() < 8) {
            if (tilPassword != null) tilPassword.setError("Mínimo 8 caracteres");
            valid = false;
        }

        if (!valid) return;
        showLoading(true);
        simulateLoginSuccess();
    }

    private String generateNonce() {
        try {
            byte[] bytes = new byte[32];
            new SecureRandom().nextBytes(bytes);
            StringBuilder rawNonce = new StringBuilder();
            for (byte b : bytes) rawNonce.append(String.format("%02x", b));
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(rawNonce.toString().getBytes());
            StringBuilder hashedNonce = new StringBuilder();
            for (byte b : digest) hashedNonce.append(String.format("%02x", b));
            return hashedNonce.toString();
        } catch (Exception e) {
            return "";
        }
    }

    private void sendTokenToBackend(String idToken, String name, String email, String photoUrl) {
        showLoading(false);
        navigateToHome(name, email, photoUrl);
    }

    private void simulateLoginSuccess() {
        new android.os.Handler().postDelayed(() -> {
            showLoading(false);
            navigateToHome("Usuario Demo", "demo@example.com", null);
        }, 1500);
    }

    private void navigateToHome(String name, String email, String photoUrl) {
        Intent intent = new Intent(this, HomeActivity.class);
        intent.putExtra("user_name", name);
        intent.putExtra("user_email", email);
        intent.putExtra("user_photo", photoUrl);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void showLoading(boolean show) {
        if (loadingOverlay != null) {
            loadingOverlay.setVisibility(show ? View.VISIBLE : View.GONE);
        }
    }
}