package com.example.avionescentral;

public final class Avion {

    public enum Direccion {
        NORTE("N", "^"),
        SUR("S", "v"),
        ESTE("E", ">"),
        OESTE("O", "<");

        private final String code;
        private final String glyph;

        Direccion(String code, String glyph) {
            this.code = code;
            this.glyph = glyph;
        }

        public String getCode() {
            return code;
        }

        public String getGlyph() {
            return glyph;
        }
    }

    private final int id;
    private final Direccion direccion;
    private int x;
    private int y;
    private boolean collision;

    public Avion(int id, int x, int y, Direccion direccion) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.direccion = direccion;
    }

    public Avion(Avion other) {
        this.id = other.id;
        this.x = other.x;
        this.y = other.y;
        this.direccion = other.direccion;
        this.collision = other.collision;
    }

    public void moveOneCell() {
        switch (direccion) {
            case NORTE:
                y--;
                break;
            case SUR:
                y++;
                break;
            case ESTE:
                x++;
                break;
            case OESTE:
                x--;
                break;
        }
    }

    public boolean isInside(int gridSize) {
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
    }

    public String getCellKey() {
        return x + ":" + y;
    }

    public int getId() {
        return id;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public boolean isCollision() {
        return collision;
    }

    public void setCollision(boolean collision) {
        this.collision = collision;
    }
}
