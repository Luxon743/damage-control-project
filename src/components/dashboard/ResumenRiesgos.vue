<script setup lang="ts">
import { computed } from 'vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const props = defineProps<{
    permisos: PermisoTrabajo[]
}>()

const contadoresRiesgo = computed(() => {
    const bajo = props.permisos.filter(p => p.riesgo === 'bajo').length
    const medio = props.permisos.filter(p => p.riesgo === 'medio').length
    const alto = props.permisos.filter(p => p.riesgo === 'alto').length
    return { bajo, medio, alto }
})
</script>

<template>
    <div class="grid grid-cols-3 gap-4">
        <div class="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-emerald-700">{{ contadoresRiesgo.bajo }}</p>
            <p class="text-xs text-emerald-600 uppercase font-semibold mt-1">Riesgo Bajo</p>
        </div>
        <div class="bg-amber-50 rounded-xl border border-amber-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-amber-700">{{ contadoresRiesgo.medio }}</p>
            <p class="text-xs text-amber-600 uppercase font-semibold mt-1">Riesgo Medio</p>
        </div>
        <div class="bg-rose-50 rounded-xl border border-rose-200 p-4 text-center shadow-sm">
            <p class="text-2xl font-bold text-rose-700">{{ contadoresRiesgo.alto }}</p>
            <p class="text-xs text-rose-600 uppercase font-semibold mt-1">Riesgo Alto</p>
        </div>
    </div>
</template>