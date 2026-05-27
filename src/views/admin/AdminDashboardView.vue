<script setup lang="ts">
import { usePermisos } from '../../composables/usePermisos'
import ResumenPermisos from '../../components/dashboard/ResumenPermisos.vue'
import ResumenRiesgos from '../../components/dashboard/ResumenRiesgos.vue'
import EstadisticasDashboard from '../../components/dashboard/Estadisticas.vue'
import AccionesRapidas from '../../components/dashboard/AccionesRapidas.vue'

const { permisos } = usePermisos()
</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
                Panel de Administración
            </h1>
            <div class="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
                Modo Auditor
            </div>
        </div>

        <AccionesRapidas />

        <ResumenPermisos :permisos="permisos" />

        <ResumenRiesgos :permisos="permisos" />

        <EstadisticasDashboard :permisos="permisos" />
    </div>
</template>