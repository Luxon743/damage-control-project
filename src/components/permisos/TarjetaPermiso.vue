<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const props = defineProps<{
    permiso: PermisoTrabajo
    nombreRutaDetalle: string 
}>()

const router = useRouter()

const estadoEstilos = computed(() => {
    switch (props.permiso.estado) {
        case 'aprobado':
            return { fondo: 'bg-emerald-100 text-emerald-700', texto: 'Aprobado' }
        case 'rechazado':
            return { fondo: 'bg-amber-100 text-amber-700', texto: 'Rechazado' }
        case 'finalizado':
            return { fondo: 'bg-blue-100 text-blue-700', texto: 'Finalizado' }
        case 'pendiente':
        default:
            return { fondo: 'bg-slate-100 text-slate-600', texto: 'Pendiente' }
    }
})

const riesgoEstilos = computed(() => {
    switch (props.permiso.riesgo) {
        case 'bajo':
            return { fondo: 'bg-emerald-100 text-emerald-700', texto: 'Bajo' }
        case 'medio':
            return { fondo: 'bg-amber-100 text-amber-700', texto: 'Medio' }
        case 'alto':
            return { fondo: 'bg-rose-100 text-rose-700', texto: 'Alto' }
    }
})

const irAlDetalle = () => {
    router.push({ 
        name: props.nombreRutaDetalle, 
        params: { id: props.permiso.id } 
    })
}
</script>

<template>
    <div @click="irAlDetalle"
        class="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col justify-between h-48 group">
        <div class="flex justify-between items-start">
            <h3 class="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors line-clamp-2">
                {{ permiso.titulo }}
            </h3>
        </div>

        <div class="flex flex-wrap gap-2 mt-2">
            <span :class="estadoEstilos.fondo" class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                {{ estadoEstilos.texto }}
            </span>
            <span :class="riesgoEstilos.fondo" class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                Riesgo {{ riesgoEstilos.texto }}
            </span>
            <span class="text-[10px] font-semibold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {{ permiso.tipoTrabajo.nombre }}
            </span>
        </div>

        <div class="border-t border-slate-100 pt-3 font-mono text-xs text-slate-500 space-y-1">
            <div><span class="font-semibold text-slate-400">ID:</span> {{ permiso.id }}</div>
            <div><span class="font-semibold text-slate-400">Fecha:</span> {{ permiso.fechaInicio }}</div>
            <div class="truncate"><span class="font-semibold text-slate-400">Contratante:</span> {{
                permiso.empresaContratante.nombre }}</div>
        </div>
    </div>
</template>