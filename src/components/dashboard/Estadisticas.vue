<script setup lang="ts">
import { computed } from 'vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const props = defineProps<{
    permisos: PermisoTrabajo[]
}>()

const pendientesConRiesgoAlto = computed(() =>
    props.permisos.filter(p => p.estado === 'pendiente' && p.riesgo === 'alto').length
)

const aprobadosSinFinalizar = computed(() =>
    props.permisos.filter(p => p.estado === 'aprobado').length
)

const rechazadosReenviables = computed(() =>
    props.permisos.filter(p => p.estado === 'rechazado' && p.intentosReenvio > 0).length
)
</script>

<template>
    <div class="space-y-3">
        <h4 class="text-sm font-bold uppercase text-slate-600">Estadísticas rápidas</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-rose-100 rounded-lg p-3 flex items-center justify-between">
                <span class="text-xs font-semibold text-rose-800">Pendientes con riesgo alto</span>
                <span class="text-lg font-bold text-rose-900">{{ pendientesConRiesgoAlto }}</span>
            </div>
            <div class="bg-emerald-100 rounded-lg p-3 flex items-center justify-between">
                <span class="text-xs font-semibold text-emerald-800">Aprobados sin finalizar</span>
                <span class="text-lg font-bold text-emerald-900">{{ aprobadosSinFinalizar }}</span>
            </div>
            <div class="bg-amber-100 rounded-lg p-3 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-800">Rechazados con reintentos</span>
                <span class="text-lg font-bold text-amber-900">{{ rechazadosReenviables }}</span>
            </div>
        </div>
    </div>
</template>