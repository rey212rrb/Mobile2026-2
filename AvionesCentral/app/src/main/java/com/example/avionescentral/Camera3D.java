package com.example.avionescentral;

public final class Camera3D {

    private float x;
    private float y;
    private float zoom = 1f;

    public void moveBy(float dx, float dy) {
        x += dx;
        y += dy;
    }

    public void setPosition(float x, float y) {
        this.x = x;
        this.y = y;
    }

    public void reset() {
        x = 0f;
        y = 0f;
        zoom = 1f;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getZoom() {
        return zoom;
    }

    public void setZoom(float zoom) {
        this.zoom = Math.max(0.45f, Math.min(2.2f, zoom));
    }

    public void zoomBy(float factor) {
        setZoom(zoom * factor);
    }
}
