package com.example.clase12_ia_claude;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;

import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.navigation.Navigator;
import com.example.clase12_ia_claude.ui.AlumnosFragment;
import com.example.clase12_ia_claude.ui.GruposFragment;
import com.example.clase12_ia_claude.ui.AsistenciasFragment;
import com.example.clase12_ia_claude.ui.GruposFragment;

/**
 * Single Activity Architecture.
 * Implementa Navigator para gestionar transiciones entre fragmentos.
 *
 * Pila de retroceso:
 *   GruposFragment (raíz, sin back stack)
 *       └─ AlumnosFragment  (back stack: "alumnos")
 *           └─ AsistenciasFragment (back stack: "asistencias")
 */
public class MainActivity extends AppCompatActivity implements Navigator {

    private static final String TAG_GRUPOS = "GruposFragment";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (savedInstanceState == null) {
            // Carga el fragmento raíz
            loadFragment(new GruposFragment(), TAG_GRUPOS, false);
        }
    }

    // ── Navigator ────────────────────────────────────────────────────────

    @Override
    public void navigateToAlumnos(Grupo grupo) {
        AlumnosFragment fragment = AlumnosFragment.newInstance(grupo.grupoId, grupo.nombre);
        loadFragment(fragment, "AlumnosFragment", true);
    }

    @Override
    public void navigateToAsistencias(long grupoId, String grupoNombre) {
        AsistenciasFragment fragment = AsistenciasFragment.newInstance(grupoId, grupoNombre);
        loadFragment(fragment, "AsistenciasFragment", true);
    }

    @Override
    public void navigateBack() {
        getSupportFragmentManager().popBackStack();
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private void loadFragment(Fragment fragment, String tag, boolean addToBackStack) {
        FragmentTransaction tx = getSupportFragmentManager()
                .beginTransaction()
                .setCustomAnimations(
                    android.R.anim.slide_in_left,
                    android.R.anim.slide_out_right,
                    android.R.anim.slide_in_left,
                    android.R.anim.slide_out_right
                )
                .replace(R.id.fragmentContainer, fragment, tag);

        if (addToBackStack) tx.addToBackStack(tag);
        tx.commit();
    }

    @Override
    public void onBackPressed() {
        FragmentManager fm = getSupportFragmentManager();
        if (fm.getBackStackEntryCount() > 0) {
            fm.popBackStack();
        } else {
            super.onBackPressed();
        }
    }
}
