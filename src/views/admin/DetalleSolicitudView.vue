<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const route = useRoute()
const router = useRouter()
const { permisos, revisarPermiso, finalizarPermiso } = usePermisos()

const idPermiso = route.params.id as string
const permiso = computed(() => permisos.value.find((p: PermisoTrabajo) => p.id === idPermiso))

const indiceVersionSeleccionada = ref(0)
const modoRechazo = ref(false)
const comentarioRechazo = ref('')

const versionesSeguras = computed(() => permiso.value?.versiones ?? [])
const totalVersiones = computed(() => versionesSeguras.value.length)

if (totalVersiones.value > 0) {
  indiceVersionSeleccionada.value = totalVersiones.value - 1
}

const versionActual = computed(() => versionesSeguras.value[indiceVersionSeleccionada.value])

// Aca detectamos si estamos en la vista de historial
const esHistorial = computed(() => route.path.includes('/historial'))

const volverAtras = () => {
  if (esHistorial.value) {
    router.push('/admin/historial') 
  } else {
    router.push('/admin/solicitudes')
  }
}

const confirmarAprobacion = () => {
  if (confirm('¿Estás seguro de aprobar este permiso de trabajo?')) {
    revisarPermiso(idPermiso, 'aprobado')
    volverAtras()
  }
}

const confirmarRechazo = () => {
  if (!comentarioRechazo.value.trim()) {
    alert('Debes ingresar un motivo de rechazo obligatoriamente.')
    return
  }
  revisarPermiso(idPermiso, 'rechazado', comentarioRechazo.value)
  volverAtras()
}

const confirmarFinalizacion = () => {
  if (confirm('¿Estás seguro de finalizar este permiso? Una vez finalizado no podrá editarse.')) {
    finalizarPermiso(idPermiso)
    volverAtras()
  }
}
</script>

<template>
  <div v-if="permiso && versionActual" class="max-w-5xl mx-auto space-y-6">
    <div class="relative flex items-center justify-center border-b border-slate-800 pb-4 min-h-14">
      <button @click="volverAtras"
        class="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
        :title="esHistorial ? 'Volver al historial' : 'Volver a solicitudes'">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div class="flex flex-col items-center text-center px-12">
        <div class="flex items-center justify-center gap-3">
          <h1 class="text-xl font-black text-white uppercase tracking-wide">Auditoría {{ permiso.id }}</h1>
          <span class="text-[10px] font-bold text-white bg-slate-700 px-2 py-0.5 rounded-md uppercase">
            {{ esHistorial ? 'Modo Historial' : 'Modo Admin' }}
          </span>
        </div>
        <p class="text-sm text-slate-400 mt-1">Revisión del análisis de riesgo y condiciones declaradas.</p>
      </div>
    </div>

    <div class="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl w-fit">
      <button v-for="(_, index) in versionesSeguras" :key="index" @click="indiceVersionSeleccionada = index"
        :class="indiceVersionSeleccionada === index
          ? 'bg-indigo-600 text-white shadow'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
        class="px-4 py-2 text-xs font-black uppercase rounded-lg transition">
        Versión {{ index + 1 }} {{ index === totalVersiones - 1 ? '(Actual)' : '' }}
      </button>
    </div>

    <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-800 pb-4">
        <div>
          <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Título del Trabajo</h4>
          <p class="text-base font-bold text-white mt-0.5">{{ permiso.titulo }}</p>
        </div>
        <div>
          <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Fecha Estipulada</h4>
          <p class="text-base font-bold text-white mt-0.5">{{ permiso.fechaInicio }}</p>
        </div>
      </div>

      <div>
        <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Descripción general</h4>
        <p class="text-sm text-slate-300 mt-1 bg-slate-800 p-4 rounded-xl border border-slate-700">
          {{ versionActual.descripcion || 'Sin descripción.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-3">Peligros Identificados</h4>
          <ul class="space-y-2">
            <li v-for="p in versionActual.peligros" :key="p.id"
              class="text-xs font-bold text-slate-300 bg-slate-900 px-3 py-2 rounded-xl border border-slate-700 shadow-sm flex items-center gap-2">
              {{ p.nombre }}
            </li>
            <li v-if="!versionActual.peligros?.length" class="text-xs text-slate-500 italic">No se declararon peligros en esta versión.</li>
          </ul>
        </div>

        <div class="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-3">Personal Asignado</h4>
          <ul class="space-y-2">
            <li v-for="t in versionActual.trabajadores" :key="t.id"
              class="text-xs font-bold text-slate-300 bg-slate-900 px-3 py-2 rounded-xl border border-slate-700 shadow-sm flex items-center gap-2">
              {{ t.nombre }}
            </li>
            <li v-if="!versionActual.trabajadores?.length" class="text-xs text-slate-500 italic">No se asignó personal en esta versión.</li>
          </ul>
        </div>
      </div>

      <div v-if="versionActual.comentarioRechazo" class="pt-6 border-t border-slate-800">
        <div class="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl space-y-2">
          <h5 class="text-xs font-black uppercase text-rose-400 tracking-wide">Motivo del Rechazo</h5>
          <p class="text-sm font-medium text-rose-300 bg-black/20 p-3 rounded-xl">
            {{ versionActual.comentarioRechazo }}
          </p>
        </div>
      </div>

      <div v-if="!esHistorial" class="mt-8 pt-6 border-t border-slate-800 space-y-4">
        <div v-if="permiso.estado === 'pendiente' && indiceVersionSeleccionada === totalVersiones - 1">
          <div v-if="!modoRechazo" class="flex items-center justify-end gap-4">
            <button @click="modoRechazo = true"
              class="px-8 py-3 rounded-xl border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-widest hover:bg-rose-500/10 transition">
              Rechazar Permiso
            </button>
            <button @click="confirmarAprobacion"
              class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105">
              Aprobar Trabajo
            </button>
          </div>

          <div v-else class="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl space-y-4">
            <h5 class="text-sm font-black uppercase text-rose-400">Indicar motivo de rechazo obligatoriamente</h5>
            <textarea v-model="comentarioRechazo" rows="3"
              placeholder="Detalla los cambios o medidas de seguridad faltantes..."
              class="w-full bg-slate-900 border border-rose-500/30 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:border-rose-400 outline-none transition"></textarea>

            <div class="flex justify-end gap-3 pt-2">
              <button @click="modoRechazo = false"
                class="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-400 text-xs font-bold uppercase hover:bg-slate-800 transition">
                Cancelar
              </button>
              <button @click="confirmarRechazo"
                class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-lg shadow-md transition">
                Confirmar Rechazo
              </button>
            </div>
          </div>
        </div>

        <div v-if="permiso.estado === 'aprobado'" class="flex justify-end">
          <button @click="confirmarFinalizacion"
            class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-lg transition-transform hover:scale-105">
            Finalizar Permiso
          </button>
        </div>

        <div v-if="permiso.estado === 'finalizado'" class="flex justify-end">
          <span class="bg-blue-500/20 text-blue-400 text-xs font-bold uppercase px-4 py-2 rounded-full">
            Trabajo finalizado
          </span>
        </div>

        <div v-if="permiso.estado === 'rechazado'" class="flex justify-end">
          <span class="bg-amber-500/20 text-amber-400 text-xs font-bold uppercase px-4 py-2 rounded-full">
            Rechazado - Esperando corrección
          </span>
        </div>
      </div>
    </div>
  </div>
</template>