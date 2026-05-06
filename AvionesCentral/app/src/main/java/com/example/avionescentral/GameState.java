package com.example.avionescentral;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class GameState {

    private final ArrayList<Avion> aircraft;
    private final int steps;
    private final int collisions;

    public GameState(List<Avion> sourceAircraft, int steps, int collisions) {
        this.aircraft = new ArrayList<>(sourceAircraft.size());
        for (Avion avion : sourceAircraft) {
            this.aircraft.add(new Avion(avion));
        }
        this.steps = steps;
        this.collisions = collisions;
    }

    public ArrayList<Avion> copyAircraft() {
        ArrayList<Avion> copy = new ArrayList<>(aircraft.size());
        for (Avion avion : aircraft) {
            copy.add(new Avion(avion));
        }
        return copy;
    }

    public List<Avion> getAircraftView() {
        return Collections.unmodifiableList(aircraft);
    }

    public int getSteps() {
        return steps;
    }

    public int getCollisions() {
        return collisions;
    }
}
