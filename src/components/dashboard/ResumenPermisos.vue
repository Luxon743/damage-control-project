<script setup lang="ts">
import { computed } from 'vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const props = defineProps<{
    permisos: PermisoTrabajo[]
}>()

const contadores = computed(() => {
    const total = props.permisos.length
    const pendientes = props.permisos.filter(p => p.estado === 'pendiente').length
    const aprobados = props.permisos.filter(p => p.estado === 'aprobado').length
    const rechazados = props.permisos.filter(p => p.estado === 'rechazado').length
    const finalizados = props.permisos.filter(p => p.estado === 'finalizado').length
    return { total, pendientes, aprobados, rechazados, finalizados }
})
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-slate-800">{{ contadores.total }}</p>
            <p class="text-xs text-slate-500 uppercase font-semibold mt-1">Totales</p>
        </div>
        <div class="bg-amber-50 rounded-xl border border-amber-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-amber-700">{{ contadores.pendientes }}</p>
            <p class="text-xs text-amber-600 uppercase font-semibold mt-1">Pendientes</p>
        </div>
        <div class="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-emerald-700">{{ contadores.aprobados }}</p>
            <p class="text-xs text-emerald-600 uppercase font-semibold mt-1">Aprobados</p>
        </div>
        <div class="bg-rose-50 rounded-xl border border-rose-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-rose-700">{{ contadores.rechazados }}</p>
            <p class="text-xs text-rose-600 uppercase font-semibold mt-1">Rechazados</p>
        </div>
        <div class="bg-blue-50 rounded-xl border border-blue-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-blue-700">{{ contadores.finalizados }}</p>
            <p class="text-xs text-blue-600 uppercase font-semibold mt-1">Finalizados</p>
        </div>
    </div>
</template>