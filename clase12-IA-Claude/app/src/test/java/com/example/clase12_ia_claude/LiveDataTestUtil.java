// ═══════════════════════════════════════════════════════════════════════════
// LiveDataTestUtil.java  –  Utilidad para tests con LiveData
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.Observer;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

/**
 * Utilidad para obtener el valor actual de un LiveData en pruebas unitarias.
 */
public class LiveDataTestUtil {

    public static <T> T getValue(final LiveData<T> liveData)
            throws InterruptedException, TimeoutException {
        final Object[] data = new Object[1];
        final CountDownLatch latch = new CountDownLatch(1);

        Observer<T> observer = value -> {
            data[0] = value;
            latch.countDown();
        };

        liveData.observeForever(observer);

        if (!latch.await(2, TimeUnit.SECONDS)) {
            liveData.removeObserver(observer);
            throw new TimeoutException("LiveData value was never set.");
        }

        liveData.removeObserver(observer);
        //noinspection unchecked
        return (T) data[0];
    }
}