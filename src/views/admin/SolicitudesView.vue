<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import FiltrosPermisos from '../../components/permisos/FiltrosPermisos.vue'
import TablaPermisos from '../../components/permisos/TablaPermisos.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const { permisos } = usePermisos()
const router = useRouter()

const permisosFiltrados = ref<PermisoTrabajo[]>([])

const verDetalle = (id: string) => {
    router.push({ name: 'detalle-solicitud', params: { id } })
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-white tracking-wide uppercase">
                Solicitudes de trabajo
            </h1>
            <div class="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase">
                Revisión
            </div>
        </div>

        <FiltrosPermisos :permisos="permisos" @update:filtrados="permisosFiltrados = $event" />

        <TablaPermisos :permisos="permisosFiltrados" @ver-detalle="verDetalle" />
    </div>
</template>