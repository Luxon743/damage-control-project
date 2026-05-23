import { ref } from 'vue'

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
    estado: 'aprobado' | 'pendiente' | 'rechazado' | 'denegado'
    intentosDisponibles: number
    versiones: VersionPedido[]
}

const pedidos = ref<PedidoTrabajo[]>([
    {
        id: 'T-001',
        titulo: 'Trabajo en campo',
        fecha: '15/05/2026',
        categoria: 'mecanico',
        estado: 'rechazado',
        intentosDisponibles: 2,
        versiones: [
            {
                descripcion: 'Mantenimiento de tuberias externas.',
                respuestas: { 'pregunta5': 'respuesta14' },
                comentarioAdmin: 'Falta especificar el tipo de resguardos perimetrales.'
            }
        ]
    },
    {
        id: 'T-002',
        titulo: 'Mantenimiento Electrico',
        fecha: '18/05/2026',
        categoria: 'electricidad',
        estado: 'aprobado',
        intentosDisponibles: 2,
        versiones: [
            {
                descripcion: 'Cambio de transformador principal.',
                respuestas: { 'pregunta1': 'respuesta1', 'pregunta2': 'respuesta4' }
            }
        ]
    }
])

export function usePermisos() {
    
    const agregarPedido = (nuevoPedido: { titulo: string, fecha: string, descripcion: string, categoria: string, respuestas: Record<string, string> }) => {
        const nuevoId = `T-00${pedidos.value.length + 1}`
        
        pedidos.value.push({
            id: nuevoId,
            titulo: nuevoPedido.titulo,
            fecha: nuevoPedido.fecha,
            categoria: nuevoPedido.categoria,
            estado: 'pendiente',
            intentosDisponibles: 2,
            versiones: [{
                descripcion: nuevoPedido.descripcion,
                respuestas: nuevoPedido.respuestas
            }]
        })
    }

    const reenviarPedido = (id: string, correccion: { descripcion: string, respuestas: Record<string, string> }) => {
        const p = pedidos.value.find(item => item.id === id)
        if (p && p.intentosDisponibles > 0 && p.estado === 'rechazado') {
            p.estado = 'pendiente'
            p.intentosDisponibles--
            p.versiones.push({
                descripcion: correccion.descripcion,
                respuestas: correccion.respuestas
            })
        }
    }

    const evaluarPedido = (id: string, decision: 'aprobado' | 'rechazado', comentario?: string) => {
        const p = pedidos.value.find(item => item.id === id)
        if (p && p.estado === 'pendiente') {
            if (decision === 'aprobado') {
                p.estado = 'aprobado'
            } else if (decision === 'rechazado') {
                p.estado = p.intentosDisponibles > 0 ? 'rechazado' : 'denegado'
                if (comentario && p.versiones && p.versiones.length > 0) {
                    const ultimaVersion = p.versiones[p.versiones.length - 1]
                    if (ultimaVersion) {
                        ultimaVersion.comentarioAdmin = comentario
                    }
                }
            }
        }
    }

    return {
        pedidos,
        agregarPedido,
        reenviarPedido,
        evaluarPedido
    }
}