<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import FiltrosPermisos from '../../components/permisos/FiltrosPermisos.vue'
import TablaPermisos from '../../components/permisos/TablaPermisos.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const { permisos } = usePermisos()
const router = useRouter()

const permisosPendientesYRechazados = computed(() => 
  permisos.value.filter(permiso => 
    permiso.estado === 'pendiente' || permiso.estado === 'rechazado'
  )
)

const permisosFiltrados = ref<PermisoTrabajo[]>([])

const verDetalle = (id: string) => {
  router.push({ name: 'detalle-solicitud', params: { id } })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-black text-white tracking-wide uppercase">
          Solicitudes de trabajo
        </h1>
        <p class="text-sm text-slate-400 mt-1">Permisos pendientes de revisión y rechazados que requieren acción.</p>
      </div>
      <div class="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase">
        Revisión
      </div>
    </div>

    <FiltrosPermisos
      :permisos="permisosPendientesYRechazados"
      :estados-visibles="['pendiente', 'rechazado']"
      @update:filtrados="permisosFiltrados = $event"
    />

    <TablaPermisos :permisos="permisosFiltrados" @ver-detalle="verDetalle" />

    <div v-if="permisosFiltrados.length === 0 && permisosPendientesYRechazados.length === 0" class="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
      <p class="text-slate-400 text-lg font-semibold">No hay solicitudes pendientes</p>
      <p class="text-slate-500 text-sm mt-1">Todos los permisos fueron revisados.</p>
    </div>
  </div>
</template>