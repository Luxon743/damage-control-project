export type EstadoPermiso =
    | 'aprobado'
    | 'pendiente'
    | 'rechazado'
    | 'denegado'
    | 'finalizado'

export interface VersionPedido {
    descripcion: string
    respuestas: Record<string, string>
    comentarioAdmin?: string
}

export interface PedidoTrabajo {
    id: string
    titulo: string
    fecha: string
    categoria: string
    estado: EstadoPermiso
    intentosDisponibles: number
    versiones: VersionPedido[]
}