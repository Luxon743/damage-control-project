<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import FormularioPermiso from '../../components/permisos/FormularioPermiso.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const route = useRoute()
const router = useRouter()

const { permisos, reenviarPermiso } = usePermisos()

const idPermiso = route.params.id as string

const permiso = computed(() =>
  permisos.value.find((p: PermisoTrabajo) => p.id === idPermiso)
)

const manejarSubmit = (datos: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'> & { respuestas?: Record<string, string> }) => {
  reenviarPermiso(idPermiso, {
    descripcion: datos.descripcion,
    respuestas: datos.respuestas || {},
    peligros: datos.peligros,
    trabajadores: datos.trabajadores
  })
  router.push({ name: 'mis-permisos' })
}

const cancelar = () => {
  router.push({ name: 'detalle-permiso', params: { id: idPermiso } })
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8" v-if="permiso">
    <div class="border-b border-slate-800 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-sm">↻</div>
        <h1 class="text-2xl font-black text-white uppercase tracking-wide">
          Corregir Permiso #{{ idPermiso }}
        </h1>
        <span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md uppercase animate-pulse">
          Reenvío (Intentos restantes: {{ permiso.intentosReenvio }})
        </span>
      </div>
      <p class="text-xs text-slate-400 mt-1 uppercase font-bold">
        Modifica la descripción y controles de riesgo indicados por el auditor.
      </p>
    </div>

    <FormularioPermiso
      :permiso-inicial="permiso"
      :es-edicion="true"
      @submit="manejarSubmit"
      @cancelar="cancelar"
    />
  </div>

  <div v-else class="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl mx-auto">
    <p class="text-slate-400 font-medium">No se encontró el permiso que se desea editar o no está disponible.</p>
    <button @click="router.push({ name: 'mis-permisos' })"
      class="mt-4 text-xs font-bold uppercase text-indigo-400 hover:underline cursor-pointer">
      Volver a la lista
    </button>
  </div>
</template>