<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// Definimos la estructura del objeto
interface Permiso {
    id: string
    titulo: string
    fecha: string
    nivelRiesgo: string
    estado: 'aprobado' | 'rechazado' | 'pendiente'
}

const props = defineProps<{
    permiso: Permiso,
    urlBase: string // Nueva prop para definir la ruta base (pyme o admin)
}>()

const router = useRouter()

// Logica de colores segun estado
const estadoEstilos = computed(() => {
    switch (props.permiso.estado) {
        case 'aprobado':
            return { circulo: 'bg-emerald-500', texto: 'Aprobado', colorTexto: 'text-emerald-700' }
        case 'rechazado':
            return { circulo: 'bg-rose-500', texto: 'Rechazado', colorTexto: 'text-rose-700' }
        case 'pendiente':
        default:
            return { circulo: 'bg-slate-400', texto: 'Pendiente', colorTexto: 'text-slate-500' }
    }
})

// Navegacion dinamica usando la urlBase recibida
const irAlDetalle = () => {
    router.push(`${props.urlBase}/${props.permiso.id}`)
}
</script>

<template>
    <div 
        @click="irAlDetalle"
        class="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 group"
    >
        <div class="flex justify-between items-start">
            <h3 class="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                {{ permiso.titulo }}
            </h3>
            
            <div class="flex flex-col items-end">
                <span class="h-4 w-4 rounded-full shadow-inner" :class="estadoEstilos.circulo"></span>
                <span class="text-[10px] font-semibold uppercase tracking-wider mt-1" :class="estadoEstilos.colorTexto">
                    {{ estadoEstilos.texto }}
                </span>
            </div>
        </div>

        <div class="border-t border-slate-100 pt-3 font-mono text-xs text-slate-500 space-y-1">
            <div><span class="font-semibold text-slate-400">ID:</span> {{ permiso.id }}</div>
            <div><span class="font-semibold text-slate-400">Fecha:</span> {{ permiso.fecha }}</div>
            <div class="flex items-center gap-1.5">
                <span class="font-semibold text-slate-400">Riesgo:</span> 
                <span :class="permiso.nivelRiesgo === 'Alto' ? 'text-amber-600 font-bold' : 'text-slate-600'">
                    {{ permiso.nivelRiesgo }}
                </span>
            </div>
        </div>
    </div>
</template>