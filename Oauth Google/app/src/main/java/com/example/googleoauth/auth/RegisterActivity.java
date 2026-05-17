package com.example.googleoauth.auth;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;
import androidx.credentials.exceptions.GetCredentialException;

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

public class RegisterActivity extends AppCompatActivity {

    private static final String TAG = "RegisterActivity";
    private static final int RC_GOOGLE_REGISTER = 1002;
    private static final String WEB_CLIENT_ID = "87696772657-utp4i2gtb4om223ugluq09v3iku0727s.apps.googleusercontent.com";

    private CredentialManager credentialManager;
    private GoogleSignInClient googleSignInClient;
    private TextInputLayout tilName, tilEmail, tilPassword, tilConfirmPassword;
    private TextInputEditText etName, etEmail, etPassword, etConfirmPassword;
    private View loadingOverlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        credentialManager = CredentialManager.create(this);
        googleSignInClient = buildGoogleSignInClient();
        bindViews();
        setupListeners();
    }

    private void bindViews() {
        tilName            = findViewById(R.id.til_name);
        tilEmail           = findViewById(R.id.til_email);
        tilPassword        = findViewById(R.id.til_password);
        tilConfirmPassword = findViewById(R.id.til_confirm_password);
        etName             = findViewById(R.id.et_name);
        etEmail            = findViewById(R.id.et_email);
        etPassword         = findViewById(R.id.et_password);
        etConfirmPassword  = findViewById(R.id.et_confirm_password);
        loadingOverlay     = findViewById(R.id.loading_overlay);
    }

    private void setupListeners() {
        findViewById(R.id.btn_back).setOnClickListener(v -> finish());
        findViewById(R.id.btn_google_register).setOnClickListener(v -> launchGoogleRegisterLegacy());
        findViewById(R.id.btn_register).setOnClickListener(v -> attemptEmailRegister());
    }

    private void launchGoogleRegisterLegacy() {
        showLoading(true);
        startActivityForResult(googleSignInClient.getSignInIntent(), RC_GOOGLE_REGISTER);
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
        if (requestCode == RC_GOOGLE_REGISTER) {
            handleGoogleSignInResult(GoogleSignIn.getSignedInAccountFromIntent(data));
        }
    }

    private void handleGoogleSignInResult(Task<GoogleSignInAccount> task) {
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            String photoUrl = account.getPhotoUrl() != null ? account.getPhotoUrl().toString() : null;
            registerWithBackend(account.getIdToken(), account.getDisplayName(), account.getEmail(), photoUrl);
        } catch (ApiException e) {
            showLoading(false);
            Log.e(TAG, "Error en registro con Google: " + e.getStatusCode(), e);
            Toast.makeText(this,
                    "Error al conectar con Google: [" + e.getStatusCode() + "] " + e.getMessage(),
                    Toast.LENGTH_LONG).show();
        }
    }


    private void launchGoogleRegister() {
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
                        runOnUiThread(() -> handleGoogleRegistration(result));
                    }

                    @Override
                    public void onError(GetCredentialException e) {
                        runOnUiThread(() -> {
                            showLoading(false);
                            Log.e(TAG, "Error en registro con Google", e);
                            Toast.makeText(RegisterActivity.this,
                                    "Error al conectar con Google: " + e.getMessage(),
                                    Toast.LENGTH_LONG).show();
                        });
                    }
                }
        );
    }

    private void handleGoogleRegistration(GetCredentialResponse result) {
        try {
            androidx.credentials.Credential credential = result.getCredential();

            if (credential instanceof androidx.credentials.CustomCredential &&
                    credential.getType().equals(GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL)) {

                GoogleIdTokenCredential googleCred =
                        GoogleIdTokenCredential.createFrom(
                                ((androidx.credentials.CustomCredential) credential).getData());

                String idToken  = googleCred.getIdToken();
                String email    = googleCred.getId();
                String name     = googleCred.getDisplayName();
                String photoUrl = googleCred.getProfilePictureUri() != null ?
                        googleCred.getProfilePictureUri().toString() : null;

                Log.d(TAG, "Google registro exitoso: " + email);

                registerWithBackend(idToken, name, email, photoUrl);

            } else {
                showLoading(false);
                Toast.makeText(this, "Credencial no válida", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            showLoading(false);
            Log.e(TAG, "Error procesando credencial de registro", e);
        }
    }

    private void attemptEmailRegister() {
        clearErrors();

        String name  = etName.getText() != null ? etName.getText().toString().trim() : "";
        String email = etEmail.getText() != null ? etEmail.getText().toString().trim() : "";
        String pass  = etPassword.getText() != null ? etPassword.getText().toString() : "";
        String passC = etConfirmPassword.getText() != null ? etConfirmPassword.getText().toString() : "";

        boolean valid = true;

        if (TextUtils.isEmpty(name)) {
            tilName.setError("Ingresa tu nombre");
            valid = false;
        }

        if (TextUtils.isEmpty(email)) {
            tilEmail.setError("Ingresa tu correo electrónico");
            valid = false;
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.setError("Correo no válido");
            valid = false;
        }

        if (TextUtils.isEmpty(pass)) {
            tilPassword.setError("Ingresa una contraseña");
            valid = false;
        } else if (pass.length() < 8) {
            tilPassword.setError("Mínimo 8 caracteres");
            valid = false;
        }

        if (!pass.equals(passC)) {
            tilConfirmPassword.setError("Las contraseñas no coinciden");
            valid = false;
        }

        if (!valid) return;

        showLoading(true);;
        simulateRegisterSuccess(name, email);
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private void registerWithBackend(String idToken, String name, String email, String photoUrl) {

        Log.d(TAG, "Registro con Google enviado al backend (simulado)");
        showLoading(false);
        navigateToHome(name, email, photoUrl);
    }

    private void simulateRegisterSuccess(String name, String email) {
        new android.os.Handler().postDelayed(() -> {
            showLoading(false);
            Toast.makeText(this, "¡Cuenta creada exitosamente!", Toast.LENGTH_SHORT).show();
            navigateToHome(name, email, null);
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

    private void clearErrors() {
        tilName.setError(null);
        tilEmail.setError(null);
        tilPassword.setError(null);
        tilConfirmPassword.setError(null);
    }

    private void showLoading(boolean show) {
        loadingOverlay.setVisibility(show ? View.VISIBLE : View.GONE);
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
