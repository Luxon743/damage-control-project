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
    <div class="max-w-5xl mx-auto space-y-8" v-if="permiso">
    <div class="relative flex items-center justify-center border-b border-slate-800 pb-4 min-h-14">
        <button @click="router.push({ name: 'mis-permisos' })"
            class="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
            title="Volver a mis permisos">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </button>

        <div class="flex flex-col items-center text-center px-12">
            <div class="flex items-center justify-center gap-3">
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
    </div>
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