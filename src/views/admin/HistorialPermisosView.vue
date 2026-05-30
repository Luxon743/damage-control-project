<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import TablaPermisos from '../../components/permisos/TablaPermisos.vue'
import type { PermisoTrabajo, EstadoPermiso } from '../../models/PermisoTrabajo'

const { permisos } = usePermisos()
const router = useRouter()

const permisosFinalizadosYAprobados = computed(() => 
  permisos.value.filter(permiso => 
    permiso.estado === 'finalizado' || permiso.estado === 'aprobado'
  )
)

const pestanaActiva = ref<EstadoPermiso | 'todos'>('todos')

const permisosFiltrados = computed(() => {
  if (pestanaActiva.value === 'todos') return permisosFinalizadosYAprobados.value
  return permisosFinalizadosYAprobados.value.filter(p => p.estado === pestanaActiva.value)
})

const cambiarPestana = (estado: EstadoPermiso | 'todos') => {
  pestanaActiva.value = estado
}

const verDetalle = (id: string) => {
  router.push({ name: 'detalle-historial', params: { id } })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-black text-white tracking-wide uppercase">
          Historial de permisos
        </h1>
        <p class="text-sm text-slate-400 mt-1">Registro de permisos aprobados y finalizados.</p>
      </div>
      <div class="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full uppercase">
        Registro
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="estado in ['todos', 'aprobado', 'finalizado'] as const"
        :key="estado"
        @click="cambiarPestana(estado)"
        :class="pestanaActiva === estado
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'"
        class="px-4 py-2 rounded-full border border-slate-700 text-xs font-bold uppercase transition cursor-pointer"
      >
        {{ estado === 'todos' ? 'Todos' : estado }}
      </button>
    </div>

    <TablaPermisos :permisos="permisosFiltrados" @ver-detalle="verDetalle" />

    <div v-if="permisosFiltrados.length === 0" class="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
      <p class="text-slate-400 text-lg font-semibold">No hay permisos en el historial</p>
      <p class="text-slate-500 text-sm mt-1">Los permisos aprobados o finalizados aparecerán aquí.</p>
    </div>
  </div>
</template>