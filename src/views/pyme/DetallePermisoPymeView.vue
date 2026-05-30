<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const route = useRoute()
const router = useRouter()
const { permisos } = usePermisos()

const idPermiso = route.params.id as string
const permiso = computed(() => permisos.value.find((p: PermisoTrabajo) => p.id === idPermiso))

const indiceVersionSeleccionada = ref(0)

if (permiso.value) {
  indiceVersionSeleccionada.value = permiso.value.versiones.length - 1
}

const versionActual = computed(() => permiso.value?.versiones[indiceVersionSeleccionada.value])

const irAEditar = () => {
  router.push({ name: 'editar-permiso', params: { id: idPermiso } })
}

const estadoClase = (estado: string) => {
  switch (estado) {
    case 'pendiente': return 'bg-amber-500/20 text-amber-400'
    case 'aprobado': return 'bg-emerald-500/20 text-emerald-400'
    case 'rechazado': return 'bg-rose-500/20 text-rose-400'
    case 'finalizado': return 'bg-blue-500/20 text-blue-400'
    default: return 'bg-slate-500/20 text-slate-400'
  }
}
</script>

<template>
  <div v-if="permiso && versionActual" class="max-w-5xl mx-auto space-y-6 h-full flex flex-col">
    <!-- Cabecera con botón volver -->
    <div class="relative flex items-center justify-center border-b border-slate-800 pb-4 min-h-14 shrink-0">
      <button @click="router.push({ name: 'mis-permisos' })"
        class="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
        title="Volver a mis permisos">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div class="text-center px-12">
        <h1 class="text-xl font-black text-white uppercase tracking-wide">Permiso {{ permiso.id }}</h1>
        <p class="text-sm text-slate-400 mt-1">Detalle y constancia del análisis de riesgo.</p>
      </div>
    </div>

    <!-- Contenido scrolleable -->
    <div class="flex-1 overflow-y-auto space-y-6 pr-1">
      <!-- Versiones -->
      <div class="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl w-fit">
        <button v-for="(_, index) in permiso.versiones" :key="index" @click="indiceVersionSeleccionada = index"
          :class="indiceVersionSeleccionada === index ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
          class="px-4 py-2 text-xs font-black uppercase rounded-lg transition">
          Versión {{ index + 1 }} {{ index === permiso.versiones.length - 1 ? '(Actual)' : '' }}
        </button>
      </div>

      <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-800 pb-4">
          <div>
            <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Título del Trabajo</h4>
            <p class="text-base font-bold text-white mt-0.5">{{ permiso.titulo }}</p>
          </div>

          <div class="flex items-center justify-between gap-4">
            <div>
              <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider">Fecha Estipulada</h4>
              <p class="text-base font-bold text-white mt-0.5">{{ permiso.fechaInicio }}</p>
            </div>

            <div class="text-right self-end pb-0.5">
              <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">Estado Actual</h4>
              <span :class="estadoClase(permiso.estado)" class="inline-block text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                {{ permiso.estado }}
              </span>
            </div>
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
              <li v-if="!versionActual.peligros?.length" class="text-xs text-slate-500 italic">No se declararon peligros
                en esta versión.</li>
            </ul>
          </div>

          <div class="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
            <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-3">Personal Asignado</h4>
            <ul class="space-y-2">
              <li v-for="t in versionActual.trabajadores" :key="t.id"
                class="text-xs font-bold text-slate-300 bg-slate-900 px-3 py-2 rounded-xl border border-slate-700 shadow-sm flex items-center gap-2">
                {{ t.nombre }}
              </li>
              <li v-if="!versionActual.trabajadores?.length" class="text-xs text-slate-500 italic">No se asignó personal
                en esta versión.</li>
            </ul>
          </div>
        </div>

        <div v-if="versionActual.comentarioRechazo" class="pt-6 border-t border-slate-800">
          <div class="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl space-y-2">
            <h5 class="text-xs font-black uppercase text-rose-400 tracking-wide">Motivo del Rechazo</h5>
            <p class="text-sm font-medium text-rose-300 bg-black/20 p-3 rounded-xl">
              {{ versionActual.comentarioRechazo }}
            </p>
            <div class="flex justify-between items-center text-[10px] font-mono text-rose-400/70 uppercase pt-1">
              <span>Estado: {{ permiso.estado }}</span>
              <span>Plazo límite: 3 días</span>
            </div>
          </div>
        </div>

        <div
          v-if="permiso.estado === 'rechazado' && permiso.intentosReenvio > 0 && indiceVersionSeleccionada === permiso.versiones.length - 1"
          class="flex justify-end pt-4 border-t border-slate-800">
          <button @click="irAEditar"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 text-xs">
            Corregir y Reenviar (Quedan {{ permiso.intentosReenvio }} intentos)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>