import { ref } from 'vue'

// Definimos la estructura del objeto Pedido para TypeScript
export interface PedidoTrabajo {
    id: string
    titulo: string
    fecha: string
    nivelRiesgo: string
    estado: 'aprobado' | 'rechazado' | 'pendiente'
    descripcion?: string
    peligros?: string[]
}

// ESTADO GLOBAL EN MEMORIA (Fuera de la función para que sea único en la SPA)
const pedidos = ref<PedidoTrabajo[]>([
    { id: 'T-001', titulo: 'Trabajo en campo', fecha: '15/05/2026', nivelRiesgo: 'Alto', estado: 'rechazado', descripcion: 'Mantenimiento de tuberías externas.', peligros: ['Caídas', 'Cortes'] },
    { id: 'T-002', titulo: 'Mantenimiento Eléctrico', fecha: '18/05/2026', nivelRiesgo: 'Alto', estado: 'aprobado', descripcion: 'Cambio de transformador principal.', peligros: ['Electrocución'] },
    { id: 'T-003', titulo: 'Instalación de Equipos', fecha: '20/05/2026', nivelRiesgo: 'Medio', estado: 'pendiente', descripcion: 'Montaje de servidores nuevos.', peligros: ['Posturas forzadas'] }
])

export function usePermisos() {
    // Función para agregar un pedido desde el formulario
    const agregarPedido = (nuevoPedido: Omit<PedidoTrabajo, 'id' | 'estado'>) => {
    const nuevoId = `T-00${pedidos.value.length + 1}`
    
        pedidos.value.push({
            ...nuevoPedido,
            id: nuevoId,
            estado: 'pendiente' // Todo pedido nuevo arranca en pendiente de aprobación
        })
    }

    return {
        pedidos,
        agregarPedido
    }
}