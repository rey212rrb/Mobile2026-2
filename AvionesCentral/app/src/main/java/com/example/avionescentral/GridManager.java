package com.example.avionescentral;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

public final class GridManager {

    public static final int MIN_GRID_SIZE = 4;
    public static final int MAX_GRID_SIZE = 8;
    private static final int MIN_AIRCRAFT = 2;
    private static final int MAX_AIRCRAFT = 10;
    private static final int MAX_HISTORY = 80;

    private final Random random = new Random();
    private final ArrayList<Avion> aircraft = new ArrayList<>();
    private final ArrayDeque<GameState> history = new ArrayDeque<>();

    private int steps;
    private int collisions;
    private int gridSize;

    public GridManager() {
        reset();
    }

    public void reset() {
        aircraft.clear();
        history.clear();
        steps = 0;
        collisions = 0;
        gridSize = MIN_GRID_SIZE + random.nextInt(MAX_GRID_SIZE - MIN_GRID_SIZE + 1);

        int maxAircraftForGrid = Math.min(MAX_AIRCRAFT, gridSize * gridSize);
        int count = MIN_AIRCRAFT + random.nextInt(maxAircraftForGrid - MIN_AIRCRAFT + 1);
        Avion.Direccion[] directions = Avion.Direccion.values();
        Set<String> spawnedCells = new HashSet<>();

        for (int i = 0; i < count; i++) {
            int x;
            int y;
            String key;
            do {
                x = random.nextInt(gridSize);
                y = random.nextInt(gridSize);
                key = x + ":" + y;
            } while (spawnedCells.contains(key));

            spawnedCells.add(key);
            aircraft.add(new Avion(
                    i + 1,
                    x,
                    y,
                    directions[random.nextInt(directions.length)]
            ));
        }
    }

    public void nextStep() {
        saveSnapshot();
        removeResolvedCollisions();

        for (Avion avion : aircraft) {
            avion.moveOneCell();
        }

        aircraft.removeIf(avion -> !avion.isInside(gridSize));
        steps++;
        registerEndStepCollisions();
    }

    public boolean previousStep() {
        GameState previous = history.pollLast();
        if (previous == null) {
            return false;
        }

        aircraft.clear();
        aircraft.addAll(previous.copyAircraft());
        steps = previous.getSteps();
        collisions = previous.getCollisions();
        return true;
    }

    private void removeResolvedCollisions() {
        aircraft.removeIf(Avion::isCollision);
    }

    private void saveSnapshot() {
        if (history.size() == MAX_HISTORY) {
            history.removeFirst();
        }
        history.addLast(new GameState(aircraft, steps, collisions));
    }

    public void registerEndStepCollisions() {
        for (Avion avion : aircraft) {
            avion.setCollision(false);
        }

        Map<String, ArrayList<Avion>> occupied = new HashMap<>();
        for (Avion avion : aircraft) {
            ArrayList<Avion> cell = occupied.get(avion.getCellKey());
            if (cell == null) {
                cell = new ArrayList<>();
                occupied.put(avion.getCellKey(), cell);
            }
            cell.add(avion);
        }

        for (ArrayList<Avion> cellAircraft : occupied.values()) {
            if (cellAircraft.size() > 1) {
                collisions++;
                for (Avion avion : cellAircraft) {
                    avion.setCollision(true);
                }
            }
        }
    }

    public List<Avion> getAircraft() {
        return aircraft;
    }

    public int getSteps() {
        return steps;
    }

    public int getCollisions() {
        return collisions;
    }

    public int getHistorySize() {
        return history.size();
    }

    public int getGridSize() {
        return gridSize;
    }
}
