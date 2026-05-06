package com.example.clase12_ia_claude.data.relations;

/**
 * POJO que representa el detalle de una asistencia,
 * incluyendo nombre del alumno y nombre del grupo.
 * Se usa con consultas SQL personalizadas (@Query) en Room.
 */
public class AsistenciaDetalle {

    public long asistenciaId;
    public String nombreAlumno;    // nombre + apellido del alumno
    public String nombreGrupo;     // nombre del grupo/curso
    public String fecha;
    public boolean presente;
    public String observacion;
    public long alumnoId;
    public long grupoId;
}
