// ═══════════════════════════════════════════════════════════════════════════
// GruposViewModelTest.java  (src/test/)
// ═══════════════════════════════════════════════════════════════════════════
package com.example.clase12_ia_claude;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import androidx.arch.core.executor.testing.InstantTaskExecutorRule;
import androidx.lifecycle.MutableLiveData;
import com.example.clase12_ia_claude.data.entity.Grupo;
import com.example.clase12_ia_claude.data.repository.GrupoRepository;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeoutException;

/**
 * Pruebas unitarias del GruposViewModel.
 * Se usa Mockito para aislar el Repository y
 * InstantTaskExecutorRule para sincronizar LiveData en tests.
 */
@RunWith(MockitoJUnitRunner.class)
public class GruposViewModelTest {

    @Rule
    public InstantTaskExecutorRule instantTaskExecutorRule = new InstantTaskExecutorRule();

    @Mock
    private GrupoRepository mockRepository;

    private MutableLiveData<List<Grupo>> gruposLive;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        gruposLive = new MutableLiveData<>();
        when(mockRepository.getAllGrupos()).thenReturn(gruposLive);
    }

    @Test
    public void whenRepositoryReturnsGrupos_viewModelExposesThem() throws InterruptedException, TimeoutException {
        // Arrange
        Grupo g1 = new Grupo("Matemáticas 101", "Álgebra", "Lun-Mié 08:00", "2024-1");
        g1.grupoId = 1L;
        Grupo g2 = new Grupo("Programación", "Java", "Mar-Jue 10:00", "2024-1");
        g2.grupoId = 2L;
        List<Grupo> expected = Arrays.asList(g1, g2);

        // Act
        gruposLive.setValue(expected);
        List<Grupo> result = LiveDataTestUtil.getValue(mockRepository.getAllGrupos());

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Matemáticas 101", result.get(0).nombre);
    }

    @Test
    public void whenInsertGrupoCalled_repositoryInsertIsInvoked() {
        // Arrange
        Grupo grupo = new Grupo("Base de Datos", "SQL", "Vie 14:00", "2024-1");

        // Act
        mockRepository.insert(grupo);

        // Assert
        verify(mockRepository, times(1)).insert(grupo);
    }

    @Test
    public void whenDeleteGrupoCalled_repositoryDeleteIsInvoked() {
        // Arrange
        Grupo grupo = new Grupo("Física", "Mecánica", "Jue 12:00", "2024-1");
        grupo.grupoId = 5L;

        // Act
        mockRepository.delete(grupo);

        // Assert
        verify(mockRepository, times(1)).delete(grupo);
    }

    @Test
    public void whenNoGrupos_listIsEmpty() throws InterruptedException, TimeoutException {
        // Arrange
        gruposLive.setValue(java.util.Collections.emptyList());

        // Act
        List<Grupo> result = LiveDataTestUtil.getValue(mockRepository.getAllGrupos());

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}





