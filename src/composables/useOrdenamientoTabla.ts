import { computed, ref } from 'vue'

export type DireccionOrden = 'asc' | 'desc'

export function useOrdenamientoTabla<T, C extends string>(
    items: () => T[],
    obtenerValor: (item: T, columna: C) => string | number
) {
    const columnaOrden = ref<C | null>(null)
    const direccionOrden = ref<DireccionOrden>('asc')

    const ordenarPor = (columna: C) => {
        if (columnaOrden.value === columna) {
            direccionOrden.value = direccionOrden.value === 'asc' ? 'desc' : 'asc'
        } else {
            columnaOrden.value = columna
            direccionOrden.value = 'asc'
        }
    }

    const itemsOrdenados = computed(() => {
        if (!columnaOrden.value) return items()

        return [...items()].sort((a, b) => {
            const valorA = obtenerValor(a, columnaOrden.value as C)
            const valorB = obtenerValor(b, columnaOrden.value as C)

        if (typeof valorA === 'number' && typeof valorB === 'number') {
            return direccionOrden.value === 'asc'
                ? valorA - valorB
                : valorB - valorA
        }

        return direccionOrden.value === 'asc'
            ? String(valorA).localeCompare(String(valorB))
            : String(valorB).localeCompare(String(valorA))
        })
    })

    const iconoOrden = (columna: C) => {
        if (columnaOrden.value !== columna) return '↕'
        return direccionOrden.value === 'asc' ? '↑' : '↓'
    }

    return {
        columnaOrden,
        direccionOrden,
        ordenarPor,
        itemsOrdenados,
        iconoOrden
    }
}