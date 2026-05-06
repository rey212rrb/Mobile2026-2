package com.example.avionescentral;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private static final int COLOR_NEON_BLUE = Color.rgb(0, 245, 255);
    private static final int COLOR_MATRIX = Color.rgb(57, 255, 20);
    private static final int COLOR_ALERT = Color.rgb(255, 23, 68);
    private static final int COLOR_MUTED = Color.rgb(92, 111, 119);

    private final GridManager gridManager = new GridManager();
    private final ArrayList<TextView> cells = new ArrayList<>();

    private GridLayout gridAirspace;
    private TextView txtSteps;
    private TextView txtCollisions;
    private TextView txtAircraft;
    private Button btnPrevious;
    private Button btnNext;
    private Button btnRefresh;

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
        setupGrid();
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
    }

    private void setupActions() {
        btnNext.setOnClickListener(v -> {
            gridManager.nextStep();
            render();
        });

        btnPrevious.setOnClickListener(v -> {
            if (gridManager.previousStep()) {
                setupGrid();
                render();
            }
        });

        btnRefresh.setOnClickListener(v -> {
            gridManager.reset();
            setupGrid();
            render();
        });
    }

    private void setupGrid() {
        gridAirspace.removeAllViews();
        cells.clear();
        gridAirspace.setColumnCount(gridManager.getGridSize());
        gridAirspace.setRowCount(gridManager.getGridSize());

        int totalCells = gridManager.getGridSize() * gridManager.getGridSize();
        for (int i = 0; i < totalCells; i++) {
            TextView cell = new TextView(this);
            GridLayout.LayoutParams params = new GridLayout.LayoutParams();
            params.width = 0;
            params.height = 0;
            params.columnSpec = GridLayout.spec(GridLayout.UNDEFINED, 1f);
            params.rowSpec = GridLayout.spec(GridLayout.UNDEFINED, 1f);
            params.setMargins(4, 4, 4, 4);

            cell.setLayoutParams(params);
            cell.setGravity(Gravity.CENTER);
            cell.setTypeface(Typeface.MONOSPACE, Typeface.BOLD);
            cell.setTextColor(COLOR_MATRIX);
            cell.setTextSize(getCellTextSize());
            cell.setBackgroundResource(R.drawable.bg_cell);

            cells.add(cell);
            gridAirspace.addView(cell);
        }
    }

    private void render() {
        for (TextView cell : cells) {
            cell.setText("");
            cell.setTextColor(COLOR_MUTED);
            cell.setBackgroundResource(R.drawable.bg_cell);
        }

        for (Avion avion : gridManager.getAircraft()) {
            int index = avion.getY() * gridManager.getGridSize() + avion.getX();
            TextView cell = cells.get(index);

            String marker = avion.isCollision() ? "X" : avion.getDireccion().getGlyph();

            cell.setText(marker);
            cell.setTextColor(avion.isCollision() ? COLOR_ALERT : COLOR_NEON_BLUE);
            cell.setBackgroundResource(avion.isCollision()
                    ? R.drawable.bg_cell_collision
                    : R.drawable.bg_cell_active);
        }

        txtSteps.setText("STEPS: " + gridManager.getSteps());
        txtCollisions.setText("COLLISIONS: " + gridManager.getCollisions());
        txtAircraft.setText("GRID: " + gridManager.getGridSize() + "x" + gridManager.getGridSize()
                + "\nAIR: " + gridManager.getAircraft().size());
        btnPrevious.setEnabled(gridManager.getHistorySize() > 0);
    }

    private float getCellTextSize() {
        if (gridManager.getGridSize() >= 8) {
            return 18;
        }
        if (gridManager.getGridSize() >= 6) {
            return 21;
        }
        return 24;
    }
}
