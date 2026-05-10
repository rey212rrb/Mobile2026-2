package com.example.avionescentral;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public final class Space3DView extends View {

    public interface OnSpaceObjectClickListener<T> {
        void onSpaceObjectClick(SpaceObject<T> object);
    }

    private static final float WORLD_UNIT = 118f;
    private static final float GRID_STEP_WORLD = 1f;
    private static final float BASE_AIRCRAFT_SIZE = 58f;
    private static final float FOCAL_LENGTH = 420f;
    private static final float CULL_MARGIN = 120f;
    private static final int BACKGROUND = Color.rgb(12, 16, 18);
    private static final int GRID_MAJOR = Color.argb(58, 0, 245, 255);
    private static final int GRID_MINOR = Color.argb(24, 57, 255, 20);
    private static final int AIRCRAFT = Color.rgb(0, 245, 255);
    private static final int ALERT = Color.rgb(255, 23, 68);
    private static final int EXPLOSION = Color.rgb(255, 183, 0);
    private static final int LABEL = Color.rgb(226, 252, 255);

    private final Camera3D camera = new Camera3D();
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final Path aircraftPath = new Path();
    private final RectF hitRect = new RectF();
    private final Object lock = new Object();
    private final ArrayList<SpaceObject<?>> objects = new ArrayList<>();
    private final ArrayList<ProjectedObject> visibleObjects = new ArrayList<>();

    private float lastTouchX;
    private float lastTouchY;
    private float downX;
    private float downY;
    private boolean dragging;
    private OnSpaceObjectClickListener<Object> clickListener;

    public Space3DView(Context context) {
        super(context);
        init();
    }

    public Space3DView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public Space3DView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        setFocusable(true);
        setBackgroundColor(BACKGROUND);
    }

    public Camera3D getCamera() {
        return camera;
    }

    public void zoomIn() {
        camera.zoomBy(1.18f);
        postInvalidateOnAnimation();
    }

    public void zoomOut() {
        camera.zoomBy(1f / 1.18f);
        postInvalidateOnAnimation();
    }

    public <T> void setSpaceObjects(List<SpaceObject<T>> newObjects) {
        synchronized (lock) {
            objects.clear();
            objects.addAll(newObjects);
        }
        postInvalidateOnAnimation();
    }

    public void setWorldSize(int worldSize) {
        postInvalidateOnAnimation();
    }

    public <T> void centerCameraOn(List<SpaceObject<T>> targetObjects) {
        if (targetObjects.isEmpty()) {
            camera.reset();
            return;
        }

        float sumX = 0f;
        float sumY = 0f;
        for (SpaceObject<T> object : targetObjects) {
            sumX += object.getX();
            sumY += object.getY();
        }
        camera.setPosition(sumX / targetObjects.size(), sumY / targetObjects.size());
        postInvalidateOnAnimation();
    }

    @SuppressWarnings("unchecked")
    public <T> void setOnSpaceObjectClickListener(OnSpaceObjectClickListener<T> listener) {
        clickListener = (OnSpaceObjectClickListener<Object>) listener;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                downX = lastTouchX = event.getX();
                downY = lastTouchY = event.getY();
                dragging = false;
                return true;
            case MotionEvent.ACTION_MOVE:
                float dx = event.getX() - lastTouchX;
                float dy = event.getY() - lastTouchY;
                if (Math.abs(event.getX() - downX) > 8f || Math.abs(event.getY() - downY) > 8f) {
                    dragging = true;
                }
                camera.moveBy(-dx / (WORLD_UNIT * camera.getZoom()), -dy / (WORLD_UNIT * camera.getZoom()));
                lastTouchX = event.getX();
                lastTouchY = event.getY();
                postInvalidateOnAnimation();
                return true;
            case MotionEvent.ACTION_UP:
                if (!dragging) {
                    handleTap(event.getX(), event.getY());
                }
                return true;
            default:
                return true;
        }
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawColor(BACKGROUND);
        drawInfiniteGrid(canvas);
        projectVisibleObjects(canvas.getWidth(), canvas.getHeight());
        drawObjects(canvas);
        drawCameraHud(canvas);
    }

    private void drawInfiniteGrid(Canvas canvas) {
        float width = canvas.getWidth();
        float height = canvas.getHeight();
        float centerX = width * 0.5f;
        float centerY = height * 0.5f;
        float step = WORLD_UNIT * camera.getZoom() * GRID_STEP_WORLD;
        float offsetX = wrap(centerX - camera.getX() * WORLD_UNIT * camera.getZoom(), step);
        float offsetY = wrap(centerY - camera.getY() * WORLD_UNIT * camera.getZoom(), step);

        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(1f);
        paint.setAlpha(255);
        for (float x = offsetX; x < width; x += step) {
            boolean major = Math.round((x - offsetX) / step) % 4 == 0;
            paint.setColor(major ? GRID_MAJOR : GRID_MINOR);
            canvas.drawLine(x, 0f, x, height, paint);
        }
        for (float y = offsetY; y < height; y += step) {
            boolean major = Math.round((y - offsetY) / step) % 4 == 0;
            paint.setColor(major ? GRID_MAJOR : GRID_MINOR);
            canvas.drawLine(0f, y, width, y, paint);
        }
    }

    private float wrap(float value, float step) {
        float wrapped = value % step;
        return wrapped < 0f ? wrapped + step : wrapped;
    }

    private void projectVisibleObjects(float width, float height) {
        visibleObjects.clear();
        List<SpaceObject<?>> snapshot;
        synchronized (lock) {
            snapshot = new ArrayList<>(objects);
        }

        float centerX = width * 0.5f;
        float centerY = height * 0.5f;
        for (SpaceObject<?> object : snapshot) {
            float depthScale = getDepthScale(object.getZ());
            float deltaX = object.getX() - camera.getX();
            float deltaY = object.getY() - camera.getY();
            float screenX = centerX + deltaX * WORLD_UNIT * camera.getZoom();
            float screenY = centerY + deltaY * WORLD_UNIT * camera.getZoom();
            float size = BASE_AIRCRAFT_SIZE * camera.getZoom() * depthScale;

            if (screenX + size < -CULL_MARGIN || screenX - size > width + CULL_MARGIN
                    || screenY + size < -CULL_MARGIN || screenY - size > height + CULL_MARGIN) {
                continue;
            }
            visibleObjects.add(new ProjectedObject(object, screenX, screenY, size, depthScale));
        }
        Collections.sort(visibleObjects, Comparator.comparingDouble(projected -> projected.source.getZ()));
    }

    private float getDepthScale(float z) {
        float scale = FOCAL_LENGTH / (FOCAL_LENGTH + z);
        return Math.max(0.42f, Math.min(1.75f, scale));
    }

    private void drawObjects(Canvas canvas) {
        for (ProjectedObject projected : visibleObjects) {
            SpaceObject<?> object = projected.source;
            float half = projected.size * 0.5f;

            if (object.isAlert()) {
                if ("*".equals(object.getMarker())) {
                    drawExplosionMarker(canvas, projected, half);
                } else {
                    drawCollisionMarker(canvas, projected, half);
                }
                continue;
            }

            paint.setStyle(Paint.Style.FILL);
            paint.setColor(AIRCRAFT);
            paint.setAlpha(70);
            canvas.drawCircle(projected.screenX, projected.screenY, projected.size * 0.78f, paint);

            paint.setAlpha(255);
            buildAircraftPath(projected.screenX, projected.screenY, half, getHeadingDegrees(object.getMarker()));
            canvas.drawPath(aircraftPath, paint);

            paint.setStyle(Paint.Style.STROKE);
            paint.setStrokeWidth(Math.max(2f, 3f * projected.depthScale));
            paint.setColor(Color.WHITE);
            paint.setAlpha(170);
            canvas.drawPath(aircraftPath, paint);

            paint.setAlpha(255);
            paint.setStyle(Paint.Style.FILL);
            paint.setTextAlign(Paint.Align.CENTER);
            paint.setTextSize(Math.max(13f, 15f * camera.getZoom() * projected.depthScale));
            paint.setColor(LABEL);
            canvas.drawText(object.getMarker() + object.getId(),
                    projected.screenX,
                    projected.screenY + half + paint.getTextSize(),
                    paint);
        }
    }

    private void drawCollisionMarker(Canvas canvas, ProjectedObject projected, float half) {
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(ALERT);
        paint.setAlpha(95);
        canvas.drawCircle(projected.screenX, projected.screenY, projected.size * 0.82f, paint);

        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeCap(Paint.Cap.ROUND);
        paint.setStrokeWidth(Math.max(7f, projected.size * 0.16f));
        paint.setColor(ALERT);
        paint.setAlpha(255);
        canvas.drawLine(projected.screenX - half, projected.screenY - half,
                projected.screenX + half, projected.screenY + half, paint);
        canvas.drawLine(projected.screenX + half, projected.screenY - half,
                projected.screenX - half, projected.screenY + half, paint);
        paint.setStrokeCap(Paint.Cap.BUTT);

        paint.setStyle(Paint.Style.FILL);
        paint.setTextAlign(Paint.Align.CENTER);
        paint.setTextSize(Math.max(13f, 15f * camera.getZoom() * projected.depthScale));
        paint.setColor(LABEL);
        canvas.drawText("X" + projected.source.getId(),
                projected.screenX,
                projected.screenY + half + paint.getTextSize(),
                paint);
    }

    private void drawExplosionMarker(Canvas canvas, ProjectedObject projected, float half) {
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(EXPLOSION);
        paint.setAlpha(95);
        canvas.drawCircle(projected.screenX, projected.screenY, projected.size * 0.9f, paint);

        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeCap(Paint.Cap.ROUND);
        paint.setStrokeWidth(Math.max(4f, projected.size * 0.09f));
        paint.setColor(EXPLOSION);
        paint.setAlpha(255);

        for (int angle = 0; angle < 360; angle += 45) {
            double radians = Math.toRadians(angle);
            float inner = half * 0.2f;
            float outer = half * 1.18f;
            float startX = projected.screenX + (float) Math.cos(radians) * inner;
            float startY = projected.screenY + (float) Math.sin(radians) * inner;
            float endX = projected.screenX + (float) Math.cos(radians) * outer;
            float endY = projected.screenY + (float) Math.sin(radians) * outer;
            canvas.drawLine(startX, startY, endX, endY, paint);
        }

        paint.setStrokeWidth(Math.max(6f, projected.size * 0.14f));
        paint.setColor(ALERT);
        canvas.drawLine(projected.screenX - half * 0.72f, projected.screenY,
                projected.screenX + half * 0.72f, projected.screenY, paint);
        canvas.drawLine(projected.screenX, projected.screenY - half * 0.72f,
                projected.screenX, projected.screenY + half * 0.72f, paint);
        paint.setStrokeCap(Paint.Cap.BUTT);

        paint.setStyle(Paint.Style.FILL);
        paint.setTextAlign(Paint.Align.CENTER);
        paint.setTextSize(Math.max(13f, 15f * camera.getZoom() * projected.depthScale));
        paint.setColor(LABEL);
        canvas.drawText("*" + projected.source.getId(),
                projected.screenX,
                projected.screenY + half + paint.getTextSize(),
                paint);
    }

    private void buildAircraftPath(float centerX, float centerY, float half, float degrees) {
        double radians = Math.toRadians(degrees);
        float forwardX = (float) Math.sin(radians);
        float forwardY = (float) -Math.cos(radians);
        float rightX = (float) Math.cos(radians);
        float rightY = (float) Math.sin(radians);

        float noseX = centerX + forwardX * half;
        float noseY = centerY + forwardY * half;
        float tailX = centerX - forwardX * half * 0.76f;
        float tailY = centerY - forwardY * half * 0.76f;
        float notchX = centerX - forwardX * half * 0.32f;
        float notchY = centerY - forwardY * half * 0.32f;

        aircraftPath.reset();
        aircraftPath.moveTo(noseX, noseY);
        aircraftPath.lineTo(tailX + rightX * half * 0.78f, tailY + rightY * half * 0.78f);
        aircraftPath.lineTo(notchX, notchY);
        aircraftPath.lineTo(tailX - rightX * half * 0.78f, tailY - rightY * half * 0.78f);
        aircraftPath.close();
    }

    private float getHeadingDegrees(String marker) {
        if (">".equals(marker)) {
            return 90f;
        }
        if ("v".equals(marker)) {
            return 180f;
        }
        if ("<".equals(marker)) {
            return 270f;
        }
        return 0f;
    }

    private void drawCameraHud(Canvas canvas) {
        float centerX = canvas.getWidth() * 0.5f;
        float centerY = canvas.getHeight() * 0.5f;

        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(2f);
        paint.setAlpha(180);
        paint.setColor(Color.rgb(57, 255, 20));
        canvas.drawLine(centerX - 12f, centerY, centerX + 12f, centerY, paint);
        canvas.drawLine(centerX, centerY - 12f, centerX, centerY + 12f, paint);

        paint.setStyle(Paint.Style.FILL);
        paint.setAlpha(220);
        paint.setTextAlign(Paint.Align.LEFT);
        paint.setTextSize(13f);
        paint.setColor(LABEL);
        canvas.drawText("AIR VISIBLE: " + visibleObjects.size(), 14f, 24f, paint);
    }

    private void handleTap(float x, float y) {
        ProjectedObject selected = null;
        for (int i = visibleObjects.size() - 1; i >= 0; i--) {
            ProjectedObject projected = visibleObjects.get(i);
            float radius = Math.max(28f, projected.size);
            hitRect.set(projected.screenX - radius, projected.screenY - radius,
                    projected.screenX + radius, projected.screenY + radius);
            if (hitRect.contains(x, y)) {
                selected = projected;
                break;
            }
        }

        if (selected != null && clickListener != null) {
            @SuppressWarnings("unchecked")
            SpaceObject<Object> clicked = (SpaceObject<Object>) selected.source;
            clickListener.onSpaceObjectClick(clicked);
        }
    }

    private static final class ProjectedObject {
        private final SpaceObject<?> source;
        private final float screenX;
        private final float screenY;
        private final float size;
        private final float depthScale;

        private ProjectedObject(SpaceObject<?> source, float screenX, float screenY, float size, float depthScale) {
            this.source = source;
            this.screenX = screenX;
            this.screenY = screenY;
            this.size = size;
            this.depthScale = depthScale;
        }
    }
}
