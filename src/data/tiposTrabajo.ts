import type { TipoTrabajo } from '@/models/TipoTrabajo'

export const tiposTrabajoIniciales: TipoTrabajo[] = [
    {
        id: 1,
        nombre: 'Mantenimiento mecánico',
        categoria: 'mecanico',
        puntaje: 3
    },
    {
        id: 2,
        nombre: 'Mantenimiento eléctrico',
        categoria: 'electricidad',
        puntaje: 5
    },
    {
        id: 3,
        nombre: 'Trabajo en caliente',
        categoria: 'caliente',
        puntaje: 5
    },
    {
        id: 4,
        nombre: 'Izaje de cargas',
        categoria: 'izaje',
        puntaje: 4
    },
    {
        id: 5,
        nombre: 'Trabajo en altura',
        categoria: 'altura',
        puntaje: 4
    },
    {
        id: 6,
        nombre: 'Inspección visual',
        categoria: 'inspeccion',
        puntaje: 1
    }
]