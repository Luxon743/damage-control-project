<script setup lang="ts">
import { ref } from 'vue'
import { usePermisos } from '../../composables/usePermisos'
import FiltrosPermisos from '../../components/permisos/FiltrosPermisos.vue'
import TarjetaPermiso from '../../components/permisos/TarjetaPermiso.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const { permisos } = usePermisos()

const permisosFiltrados = ref<PermisoTrabajo[]>([])
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
                Solicitudes de trabajo
            </h1>
            <div class="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
                Revisión
            </div>
        </div>

        <FiltrosPermisos :permisos="permisos" @update:filtrados="permisosFiltrados = $event" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TarjetaPermiso v-for="permiso in permisosFiltrados" :key="permiso.id" :permiso="permiso"
                urlBase="/admin/solicitudes" />
        </div>

        <div v-if="permisosFiltrados.length === 0" class="text-center py-20">
            <p class="text-slate-400 font-medium">No se encontraron solicitudes con esos filtros.</p>
        </div>
    </div>
</template>