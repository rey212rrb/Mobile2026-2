package com.example.avionescentral;

public final class SpaceObject<T> {

    private final int id;
    private final float x;
    private final float y;
    private final float z;
    private final String marker;
    private final boolean alert;
    private final T payload;

    public SpaceObject(int id, float x, float y, float z, String marker, boolean alert, T payload) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.marker = marker;
        this.alert = alert;
        this.payload = payload;
    }

    public int getId() {
        return id;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getZ() {
        return z;
    }

    public String getMarker() {
        return marker;
    }

    public boolean isAlert() {
        return alert;
    }

    public T getPayload() {
        return payload;
    }
}
