package com.example.googleoauth.auth;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
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

public class ForgotPasswordActivity extends AppCompatActivity {

    private static final String TAG = "ForgotPasswordActivity";
    private static final int RC_GOOGLE_RECOVERY = 1003;
    private static final String WEB_CLIENT_ID = "87696772657-utp4i2gtb4om223ugluq09v3iku0727s.apps.googleusercontent.com";

    private CredentialManager credentialManager;
    private GoogleSignInClient googleSignInClient;
    private LinearLayout llEmailForm, llSuccess;
    private TextInputLayout tilEmail;
    private TextInputEditText etEmail;
    private View loadingOverlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);

        credentialManager = CredentialManager.create(this);
        googleSignInClient = buildGoogleSignInClient();
        bindViews();
        setupListeners();
    }

    private void bindViews() {
        llEmailForm    = findViewById(R.id.ll_email_form);
        llSuccess      = findViewById(R.id.ll_success);
        tilEmail       = findViewById(R.id.til_email);
        etEmail        = findViewById(R.id.et_email);
        loadingOverlay = findViewById(R.id.loading_overlay);
    }

    private void setupListeners() {
        findViewById(R.id.btn_back).setOnClickListener(v -> finish());
        findViewById(R.id.option_google).setOnClickListener(v -> recoverViaGoogleLegacy());
        findViewById(R.id.option_email).setOnClickListener(v -> {
            llEmailForm.setVisibility(
                    llEmailForm.getVisibility() == View.VISIBLE ? View.GONE : View.VISIBLE);
        });

        findViewById(R.id.btn_send_email).setOnClickListener(v -> sendRecoveryEmail());
    }

    private void recoverViaGoogleLegacy() {
        showLoading(true);
        startActivityForResult(googleSignInClient.getSignInIntent(), RC_GOOGLE_RECOVERY);
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
        if (requestCode == RC_GOOGLE_RECOVERY) {
            handleGoogleSignInResult(GoogleSignIn.getSignedInAccountFromIntent(data));
        }
    }

    private void handleGoogleSignInResult(Task<GoogleSignInAccount> task) {
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            showLoading(false);
            Toast.makeText(this, "Verificado con Google", Toast.LENGTH_SHORT).show();

            Intent intent = new Intent(this, HomeActivity.class);
            intent.putExtra("user_name", account.getDisplayName());
            intent.putExtra("user_email", account.getEmail());
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
        } catch (ApiException e) {
            showLoading(false);
            Log.e(TAG, "Error en recuperacion con Google: " + e.getStatusCode(), e);
            Toast.makeText(this, "No se pudo verificar con Google. Usa el email.", Toast.LENGTH_LONG).show();
            llEmailForm.setVisibility(View.VISIBLE);
        }
    }

    private void recoverViaGoogle() {
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
                        runOnUiThread(() -> handleGoogleRecovery(result));
                    }

                    @Override
                    public void onError(GetCredentialException e) {
                        runOnUiThread(() -> {
                            showLoading(false);
                            Log.e(TAG, "Error en recuperación con Google", e);
                            Toast.makeText(ForgotPasswordActivity.this,
                                    "No se pudo verificar con Google. Usa el email.",
                                    Toast.LENGTH_LONG).show();
                            // Mostrar opción de email como fallback
                            llEmailForm.setVisibility(View.VISIBLE);
                        });
                    }
                }
        );
    }

    private void handleGoogleRecovery(GetCredentialResponse result) {
        try {
            androidx.credentials.Credential credential = result.getCredential();

            if (credential instanceof androidx.credentials.CustomCredential &&
                    credential.getType().equals(GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL)) {

                GoogleIdTokenCredential googleCred =
                        GoogleIdTokenCredential.createFrom(
                                ((androidx.credentials.CustomCredential) credential).getData());

                String idToken = googleCred.getIdToken();
                String email   = googleCred.getId();

                Log.d(TAG, "Google recuperación exitosa para: " + email);

                showLoading(false);
                Toast.makeText(this, "Verificado con Google ✓", Toast.LENGTH_SHORT).show();

                Intent intent = new Intent(this, HomeActivity.class);
                intent.putExtra("user_name", googleCred.getDisplayName());
                intent.putExtra("user_email", email);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                finish();

            } else {
                showLoading(false);
                Toast.makeText(this, "Tipo de credencial no válido", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            showLoading(false);
            Log.e(TAG, "Error procesando recuperación con Google", e);
        }
    }


    private void sendRecoveryEmail() {
        tilEmail.setError(null);

        String email = etEmail.getText() != null ? etEmail.getText().toString().trim() : "";

        if (TextUtils.isEmpty(email)) {
            tilEmail.setError("Ingresa tu correo electrónico");
            return;
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.setError("Correo no válido");
            return;
        }

        showLoading(true);

        new android.os.Handler().postDelayed(() -> {
            showLoading(false);
            llEmailForm.setVisibility(View.GONE);
            llSuccess.setVisibility(View.VISIBLE);

            TextView tvDetail = findViewById(R.id.tv_success_detail);
            tvDetail.setText("Enviamos un enlace a " + email + ". Revisa también tu carpeta de spam.");

        }, 1500);
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
