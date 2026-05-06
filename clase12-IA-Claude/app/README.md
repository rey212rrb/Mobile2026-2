# AttendanceApp — Documentación Técnica

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                   │
│                                                             │
│   MainActivity (implementa Navigator)                       │
│       │                                                     │
│       ├── GruposFragment ──────── GruposViewModel           │
│       ├── AlumnosFragment ─────── AlumnosViewModel          │
│       └── AsistenciasFragment ─── AsistenciasViewModel      │
│                                                             │
│   GenericAdapter<T>  (adaptador reutilizable)               │
└───────────────────────────┬─────────────────────────────────┘
                            │ observa LiveData
┌───────────────────────────▼─────────────────────────────────┐
│                      CAPA DE DOMINIO                        │
│                                                             │
│   GrupoRepository                                           │
│   AlumnoRepository                                          │
│   AsistenciaRepository                                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    CAPA DE DATOS (Room)                     │
│                                                             │
│   ┌──────────┐   ┌──────────┐   ┌──────────────────────┐  │
│   │ AlumnoDao│   │ GrupoDao │   │   AsistenciaDao       │  │
│   └────┬─────┘   └────┬─────┘   └──────────┬───────────┘  │
│        │              │                     │               │
│   ┌────▼──────────────▼─────────────────────▼───────────┐  │
│   │               AppDatabase (Room)                    │  │
│   │   Alumno | Grupo | AlumnoGrupoCrossRef | Asistencia │  │
│   └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Relaciones de la Base de Datos

```
Alumno ──────────────────── AlumnoGrupoCrossRef ─────────── Grupo
(alumnoId PK)  M          (alumnoId FK, grupoId FK)       N  (grupoId PK)
               │                                               │
               │                                               │
               └────────────────── Asistencia ────────────────┘
                                 (alumnoId FK,
                                  grupoId FK,
                                  fecha, presente)
```

### Relaciones implementadas

| Relación | Entidades | Tipo |
|----------|-----------|------|
| Inscripción | Alumno ↔ Grupo | Muchos a Muchos (junction table) |
| Registro de asistencia | Alumno+Grupo → Asistencia | Uno a Muchos |

## Navegación

```
GruposFragment
    │  (clic en grupo)
    ▼
AlumnosFragment  [args: grupoId, grupoNombre]
    │  (clic en btn "Ver Asistencias" o en alumno)
    ▼
AsistenciasFragment  [args: grupoId, grupoNombre]
```

## Archivos generados

### Data Layer
| Archivo | Descripción |
|---------|-------------|
| `entity/Alumno.java` | Entidad Room — tabla `alumnos` |
| `entity/Grupo.java` | Entidad Room — tabla `grupos` |
| `entity/AlumnoGrupoCrossRef.java` | Junction table M:N |
| `entity/Asistencia.java` | Tabla asistencias (1:N) |
| `relations/GrupoConAlumnos.java` | @Relation para consultas |
| `relations/AlumnoConGrupos.java` | @Relation para consultas |
| `relations/AsistenciaDetalle.java` | POJO con JOIN |
| `dao/AlumnoDao.java` | DAO con LiveData |
| `dao/GrupoDao.java` | DAO con LiveData |
| `dao/AsistenciaDao.java` | DAO con JOIN customizado |
| `db/AppDatabase.java` | Singleton + seed inicial |

### Repository Layer
| Archivo | Descripción |
|---------|-------------|
| `repository/GrupoRepository.java` | Bridge ViewModel-DAO |
| `repository/Repositories.java` | AlumnoRepository + AsistenciaRepository |

### UI Layer
| Archivo | Descripción |
|---------|-------------|
| `navigation/Navigator.java` | Interfaz de navegación |
| `MainActivity.java` | Single Activity + Navigator impl |
| `ui/adapter/GenericAdapter.java` | Adaptador genérico `<T>` con DiffUtil |
| `ui/viewmodel/ViewModels.java` | Tres ViewModels con LiveData |
| `ui/fragment/Fragments.java` | Tres Fragmentos |

### Tests
| Archivo | Descripción |
|---------|-------------|
| `test/Tests.java` | GruposViewModelTest + AsistenciaDaoTest + LiveDataTestUtil |

## Patrones de diseño utilizados

- **MVVM** — separación clara View → ViewModel → Repository → DAO
- **Repository Pattern** — única fuente de verdad para los datos
- **Observer (LiveData)** — actualización reactiva de la UI
- **Singleton** — AppDatabase
- **Generic Adapter** — evita repetición de código en RecyclerViews
- **Navigator/Listener** — desacoplamiento fragmento-actividad
- **Callback (Room seed)** — inserción de datos iniciales al crear la BD
