import type { PermisoTrabajo } from '@/models/PermisoTrabajo'

export const permisos: PermisoTrabajo[] = [
    {
        id: 1,
        titulo: 'Mantenimiento de tablero eléctrico',
        descripcion: 'Revisión preventiva de tablero general en planta de proceso.',

        empresaSolicitanteId: 3,
        empresaContratanteId: 1,

        ubicacion: 'Planta Norte - Sala eléctrica',
        fecha: '2026-05-25',
        horarioInicio: '08:00',
        horarioFin: '12:00',

        tipoTrabajoId: 3,
        peligrosIds: [2, 4],
        trabajadoresIds: [2, 3],

        observaciones: 'Verificar bloqueo eléctrico antes de iniciar la tarea.',

        estado: 'pendiente',
        nivelRiesgo: 'alto',

        fechaCreacion: '2026-05-20'
    },
    {
        id: 2,
        titulo: 'Soldadura de soporte metálico',
        descripcion: 'Reparación de soporte estructural en sector de cañerías.',

        empresaSolicitanteId: 3,
        empresaContratanteId: 2,

        ubicacion: 'Sector cañerías - Área externa',
        fecha: '2026-05-26',
        horarioInicio: '09:00',
        horarioFin: '13:00',

        tipoTrabajoId: 1,
        peligrosIds: [1, 3, 4],
        trabajadoresIds: [1, 3],

        observaciones: 'Mantener matafuegos y permiso de trabajo en caliente visible.',

        estado: 'aprobado',
        nivelRiesgo: 'alto',

        fechaCreacion: '2026-05-18'
    },
    {
        id: 3,
        titulo: 'Inspección de válvulas',
        descripcion: 'Control visual de válvulas en línea secundaria.',

        empresaSolicitanteId: 4,
        empresaContratanteId: 1,

        ubicacion: 'Línea secundaria - Sector B',
        fecha: '2026-05-27',
        horarioInicio: '10:00',
        horarioFin: '11:30',

        tipoTrabajoId: 6,
        peligrosIds: [5],
        trabajadoresIds: [4],

        observaciones: 'Usar protección auditiva durante la inspección.',

        estado: 'rechazado',
        nivelRiesgo: 'medio',

        comentarioRevision: 'Debe asignarse un trabajador con mayor experiencia para ingresar al sector.',
        fechaCreacion: '2026-05-19'
    },
    {
        id: 4,
        titulo: 'Izaje de bomba industrial',
        descripcion: 'Movimiento de bomba industrial con hidrogrúa.',

        empresaSolicitanteId: 4,
        empresaContratanteId: 2,

        ubicacion: 'Patio de maniobras',
        fecha: '2026-05-22',
        horarioInicio: '07:30',
        horarioFin: '10:30',

        tipoTrabajoId: 4,
        peligrosIds: [4],
        trabajadoresIds: [3, 4],

        observaciones: 'Delimitar el área antes de comenzar el izaje.',

        estado: 'finalizado',
        nivelRiesgo: 'medio',

        fechaCreacion: '2026-05-15'
    }
]