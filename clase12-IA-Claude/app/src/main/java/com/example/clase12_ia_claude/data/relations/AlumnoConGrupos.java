// ── AlumnoConGrupos.java ─────────────────────────────────────────────────────
package com.example.clase12_ia_claude.data.relations;

import androidx.room.Embedded;
import androidx.room.Junction;
import androidx.room.Relation;

import com.example.clase12_ia_claude.data.entity.Alumno;
import com.example.clase12_ia_claude.data.entity.AlumnoGrupoCrossRef;
import com.example.clase12_ia_claude.data.entity.Grupo;

import java.util.List;

/**
 * Relación Muchos a Muchos: Un Alumno pertenece a muchos Grupos.
 */
public class AlumnoConGrupos {

    @Embedded
    public Alumno alumno;

    @Relation(
        parentColumn = "alumnoId",
        entityColumn = "grupoId",
        associateBy = @Junction(AlumnoGrupoCrossRef.class)
    )
    public List<Grupo> grupos;
}
