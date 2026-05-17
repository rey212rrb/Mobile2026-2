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
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.concurrent.Executors;

public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LoginActivity";
    private static final int RC_GOOGLE_LOGIN = 1001;
    private static final String WEB_CLIENT_ID = "87696772657-utp4i2gtb4om223ugluq09v3iku0727s.apps.googleusercontent.com";

    private CredentialManager credentialManager;
    private GoogleSignInClient googleSignInClient;
    private TextInputLayout tilEmail, tilPassword;
    private TextInputEditText etEmail, etPassword;
    private View loadingOverlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        credentialManager = CredentialManager.create(this);
        googleSignInClient = buildGoogleSignInClient();

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
        findViewById(R.id.btn_login).setOnClickListener(v -> attemptEmailLogin());

        // Login con Google
        findViewById(R.id.btn_google_login).setOnClickListener(v -> launchGoogleLoginLegacy());

        // Ir a recuperar contraseña
        TextView tvForgot = findViewById(R.id.tv_forgot_password);
        tvForgot.setOnClickListener(v ->
                startActivity(new Intent(this, ForgotPasswordActivity.class)));

        // Ir a registro
        TextView tvGoRegister = findViewById(R.id.tv_go_register);
        tvGoRegister.setOnClickListener(v ->
                startActivity(new Intent(this, RegisterActivity.class)));
    }

    private void launchGoogleLoginLegacy() {
        showLoading(true);
        startActivityForResult(googleSignInClient.getSignInIntent(), RC_GOOGLE_LOGIN);
    }

    private GoogleSignInClient buildGoogleSignInClient() {
        GoogleSignInOptions signInOptions = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(WEB_CLIENT_ID)
                .requestEmail()
                .requestProfile()
                .build();
        return GoogleSignIn.getClient(this, signInOptions);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_GOOGLE_LOGIN) {
            handleGoogleSignInResult(GoogleSignIn.getSignedInAccountFromIntent(data));
        }
    }

    private void handleGoogleSignInResult(Task<GoogleSignInAccount> task) {
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            String photoUrl = account.getPhotoUrl() != null ? account.getPhotoUrl().toString() : null;
            sendTokenToBackend(account.getIdToken(), account.getDisplayName(), account.getEmail(), photoUrl);
        } catch (ApiException e) {
            showLoading(false);
            Log.e(TAG, "Error de Google Login: " + e.getStatusCode(), e);
            Toast.makeText(this,
                    "Error al iniciar sesion con Google: [" + e.getStatusCode() + "] " + e.getMessage(),
                    Toast.LENGTH_LONG).show();
        }
    }


    private void launchGoogleLogin() {
        showLoading(true);

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
                                        "No hay cuentas registradas. Regístrate primero.", Toast.LENGTH_LONG).show();
                                startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
                            } else {
                                Log.e(TAG, "Error de Google Login", e);
                                Toast.makeText(LoginActivity.this,
                                        "Error al iniciar sesión con Google: " + e.getMessage(),
                                        Toast.LENGTH_LONG).show();
                            }
                        });
                    }
                }
        );
    }

    private void handleGoogleCredential(GetCredentialResponse result) {
        try {
            androidx.credentials.Credential credential = result.getCredential();

            if (credential instanceof androidx.credentials.CustomCredential &&
                    credential.getType().equals(GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL)) {

                GoogleIdTokenCredential googleIdToken =
                        GoogleIdTokenCredential.createFrom(
                                ((androidx.credentials.CustomCredential) credential).getData());

                String idToken   = googleIdToken.getIdToken();
                String email     = googleIdToken.getId();
                String name      = googleIdToken.getDisplayName();
                String photoUrl  = googleIdToken.getProfilePictureUri() != null ?
                        googleIdToken.getProfilePictureUri().toString() : null;

                Log.d(TAG, "Google login exitoso: " + email);

                sendTokenToBackend(idToken, name, email, photoUrl);

            } else {
                showLoading(false);
                Toast.makeText(this, "Tipo de credencial no soportado", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            showLoading(false);
            Log.e(TAG, "Error procesando credencial", e);
            Toast.makeText(this, "Error procesando credencial", Toast.LENGTH_SHORT).show();
        }
    }

    private void attemptEmailLogin() {
        boolean valid = true;
        tilEmail.setError(null);
        tilPassword.setError(null);

        String email = etEmail.getText() != null ? etEmail.getText().toString().trim() : "";
        String pass  = etPassword.getText() != null ? etPassword.getText().toString() : "";

        if (TextUtils.isEmpty(email)) {
            tilEmail.setError("Ingresa tu correo electrónico");
            valid = false;
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.setError("Correo no válido");
            valid = false;
        }

        if (TextUtils.isEmpty(pass)) {
            tilPassword.setError("Ingresa tu contraseña");
            valid = false;
        } else if (pass.length() < 8) {
            tilPassword.setError("La contraseña debe tener al menos 8 caracteres");
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
            for (byte b : bytes) {
                rawNonce.append(String.format("%02x", b));
            }

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(rawNonce.toString().getBytes());
            StringBuilder hashedNonce = new StringBuilder();
            for (byte b : digest) {
                hashedNonce.append(String.format("%02x", b));
            }
            return hashedNonce.toString();

        } catch (Exception e) {
            Log.e(TAG, "Error generando nonce", e);
            return "";
        }
    }

    private void sendTokenToBackend(String idToken, String name, String email, String photoUrl) {

        Log.d(TAG, "Token enviado al backend (simulado)");
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
        loadingOverlay.setVisibility(show ? View.VISIBLE : View.GONE);
    }
}

