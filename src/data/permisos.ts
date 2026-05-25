import type { PedidoTrabajo } from '@/models/PermisoTrabajo'

export const permisosIniciales: PedidoTrabajo[] = [
    {
        id: 'T-001',
        titulo: 'Trabajo en campo',
        fecha: '15/05/2026',
        categoria: 'mecanico',
        estado: 'rechazado',
        intentosDisponibles: 2,
        versiones: [
        {
            descripcion: 'Mantenimiento de tuberías externas.',
            respuestas: {
            pregunta5: 'respuesta14'
            },
            comentarioAdmin: 'Falta especificar el tipo de resguardos perimetrales.'
        }
        ]
    },
    {
        id: 'T-002',
        titulo: 'Mantenimiento Eléctrico',
        fecha: '18/05/2026',
        categoria: 'electricidad',
        estado: 'aprobado',
        intentosDisponibles: 2,
        versiones: [
        {
            descripcion: 'Cambio de transformador principal.',
            respuestas: {
            pregunta1: 'respuesta1',
            pregunta2: 'respuesta4'
            }
        }
        ]
    },
    {
        id: 'T-003',
        titulo: 'Izaje de carga pesada',
        fecha: '21/05/2026',
        categoria: 'izaje',
        estado: 'pendiente',
        intentosDisponibles: 2,
        versiones: [
        {
            descripcion: 'Movimiento de bomba industrial con hidrogrúa.',
            respuestas: {
            pregunta1: 'respuesta2',
            pregunta3: 'respuesta8'
            }
        }
        ]
    }
]