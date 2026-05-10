package com.example.avionescentral;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private static final int SECRET_ZOOM_IN = 0;
    private static final int SECRET_ZOOM_OUT = 1;
    private static final int SECRET_PREVIOUS = 2;
    private static final int SECRET_NEXT = 3;
    private static final int[] SECRET_SEQUENCE = {
            SECRET_ZOOM_IN,
            SECRET_ZOOM_OUT,
            SECRET_PREVIOUS,
            SECRET_NEXT
    };

    private final GridManager gridManager = new GridManager();

    private Space3DView gridAirspace;
    private TextView txtSteps;
    private TextView txtCollisions;
    private TextView txtAircraft;
    private Button btnPrevious;
    private Button btnNext;
    private Button btnRefresh;
    private Button btnZoomIn;
    private Button btnZoomOut;
    private boolean shouldCenterCamera = true;
    private boolean detonationMode;
    private int secretStep;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        View root = findViewById(R.id.main);
        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        bindViews();
        setupActions();
        render();
    }

    private void bindViews() {
        gridAirspace = findViewById(R.id.gridAirspace);
        txtSteps = findViewById(R.id.txtSteps);
        txtCollisions = findViewById(R.id.txtCollisions);
        txtAircraft = findViewById(R.id.txtAircraft);
        btnPrevious = findViewById(R.id.btnPrevious);
        btnNext = findViewById(R.id.btnNext);
        btnRefresh = findViewById(R.id.btnRefresh);
        btnZoomIn = findViewById(R.id.btnZoomIn);
        btnZoomOut = findViewById(R.id.btnZoomOut);
    }

    private void setupActions() {
        gridAirspace.setOnSpaceObjectClickListener((SpaceObject<Avion> object) -> openAircraftDetails(object.getPayload()));

        btnNext.setOnClickListener(v -> {
            if (registerSecretInput(SECRET_NEXT)) {
                detonationMode = true;
                render();
                return;
            }
            if (detonationMode) {
                render();
                return;
            }
            gridManager.nextStep();
            render();
        });

        btnPrevious.setOnClickListener(v -> {
            registerSecretInput(SECRET_PREVIOUS);
            if (gridManager.previousStep()) {
                render();
            }
        });

        btnRefresh.setOnClickListener(v -> {
            gridManager.reset();
            gridAirspace.getCamera().reset();
            shouldCenterCamera = true;
            detonationMode = false;
            secretStep = 0;
            render();
        });

        btnZoomIn.setOnClickListener(v -> {
            registerSecretInput(SECRET_ZOOM_IN);
            gridAirspace.zoomIn();
        });
        btnZoomOut.setOnClickListener(v -> {
            registerSecretInput(SECRET_ZOOM_OUT);
            gridAirspace.zoomOut();
        });
    }

    private void render() {
        ArrayList<SpaceObject<Avion>> spaceObjects = new ArrayList<>();
        for (Avion avion : gridManager.getAircraft()) {
            spaceObjects.add(new SpaceObject<>(
                    avion.getId(),
                    avion.getX(),
                    avion.getY(),
                    avion.getZ(),
                    getMarkerFor(avion),
                    detonationMode || avion.isCollision(),
                    avion
            ));
        }
        gridAirspace.setWorldSize(gridManager.getGridSize());
        gridAirspace.setSpaceObjects(spaceObjects);
        if (shouldCenterCamera) {
            gridAirspace.centerCameraOn(spaceObjects);
            shouldCenterCamera = false;
        }

        txtSteps.setText("STEPS: " + gridManager.getSteps());
        txtCollisions.setText("COLLISIONS: " + gridManager.getCollisions());
        txtAircraft.setText("SPACE: 3D"
                + "\nAIR: " + gridManager.getAircraft().size());
        btnPrevious.setEnabled(true);
    }

    private String getMarkerFor(Avion avion) {
        if (detonationMode) {
            return "*";
        }
        return avion.isCollision() ? "X" : avion.getDireccion().getGlyph();
    }

    private boolean registerSecretInput(int input) {
        if (SECRET_SEQUENCE[secretStep] == input) {
            secretStep++;
            if (secretStep == SECRET_SEQUENCE.length) {
                secretStep = 0;
                return true;
            }
            return false;
        }

        secretStep = SECRET_SEQUENCE[0] == input ? 1 : 0;
        return false;
    }

    private void openAircraftDetails(Avion avion) {
        Toast.makeText(this,
                "Avion #" + avion.getId() + "  x:" + avion.getX() + " y:" + avion.getY() + " z:" + avion.getZ(),
                Toast.LENGTH_SHORT).show();
        // En una arquitectura con Navigation Component:
        // NavHostFragment.findNavController(currentFragment)
        //         .navigate(DetailFragmentDirections.actionToDetail(avion.getId()));
    }
}
