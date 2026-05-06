// ── GrupoConAlumnos.java ─────────────────────────────────────────────────────
package com.example.clase12_ia_claude.data.relations;

import androidx.room.Embedded;
import androidx.room.Junction;
import androidx.room.Relation;

import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;
import com.example.clase12_ia_claude.data.entity.Grupo;

import java.util.List;

/**
 * Relación Muchos a Muchos: Un Grupo contiene muchos Alumnos.
 */
public class GrupoConAlumnos {

    @Embedded
    public Grupo grupo;

    @Relation(
        parentColumn = "grupoId",
        entityColumn = "alumnoId",
        associateBy = @Junction(AlumnoGrupoCrossRef.class)
    )
    public List<Alumno> alumnos;
}
