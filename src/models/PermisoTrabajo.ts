export type EstadoPermiso = 'pendiente' | 'aprobado' | 'rechazado' | 'finalizado'

export type NivelRiesgo = 'bajo' | 'medio' | 'alto'

export interface PermisoTrabajo {
    id: number

    titulo: string
    descripcion: string

    empresaSolicitanteId: number
    empresaContratanteId: number

    ubicacion: string
    fecha: string
    horarioInicio: string
    horarioFin: string

    tipoTrabajoId: number
    peligrosIds: number[]
    trabajadoresIds: number[]

    observaciones: string

    estado: EstadoPermiso
    nivelRiesgo: NivelRiesgo

    comentarioRevision?: string
    fechaCreacion: string
}