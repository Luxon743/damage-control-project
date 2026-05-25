import { ref } from 'vue'
import { permisosIniciales } from '@/data/permisos'
import type { PedidoTrabajo, EstadoPermiso } from '@/models/PermisoTrabajo'

const pedidos = ref<PedidoTrabajo[]>([...permisosIniciales])

interface NuevoPedido {
    titulo: string
    fecha: string
    descripcion: string
    categoria: string
    respuestas: Record<string, string>
}

interface CorreccionPedido {
    descripcion: string
    respuestas: Record<string, string>
}

export function usePermisos() {
    const agregarPedido = (nuevoPedido: NuevoPedido) => {
        const nuevoId = `T-${String(pedidos.value.length + 1).padStart(3, '0')}`

        pedidos.value.push({
            id: nuevoId,
            titulo: nuevoPedido.titulo,
            fecha: nuevoPedido.fecha,
            categoria: nuevoPedido.categoria,
            estado: 'pendiente',
            intentosDisponibles: 2,
            versiones: [
                {
                    descripcion: nuevoPedido.descripcion,
                    respuestas: nuevoPedido.respuestas
                }
            ]
        })
    }

    const reenviarPedido = (id: string, correccion: CorreccionPedido) => {
        const pedido = pedidos.value.find((item) => item.id === id)

        if (pedido && pedido.intentosDisponibles > 0 && pedido.estado === 'rechazado') {
            pedido.estado = 'pendiente'
            pedido.intentosDisponibles--

            pedido.versiones.push({
                descripcion: correccion.descripcion,
                respuestas: correccion.respuestas
            })
        }
    }

    const evaluarPedido = (
        id: string,
        decision: Extract<EstadoPermiso, 'aprobado' | 'rechazado'>,
        comentario?: string
        ) => {
            const pedido = pedidos.value.find((item) => item.id === id)

            if (pedido && pedido.estado === 'pendiente') {
                if (decision === 'aprobado') {
                pedido.estado = 'aprobado'
                return
                }

                if (decision === 'rechazado') {
                pedido.estado = pedido.intentosDisponibles > 0 ? 'rechazado' : 'denegado'

                const ultimaVersion = pedido.versiones[pedido.versiones.length - 1]

                if (comentario && ultimaVersion) {
                    ultimaVersion.comentarioAdmin = comentario
                }
                }
            }
        }

    const finalizarPedido = (id: string) => {
        const pedido = pedidos.value.find((item) => item.id === id)

        if (pedido && pedido.estado === 'aprobado') {
            pedido.estado = 'finalizado'
        }
    }

    return {
        pedidos,
        agregarPedido,
        reenviarPedido,
        evaluarPedido,
        finalizarPedido
    }
}