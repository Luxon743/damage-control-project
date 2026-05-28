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

const versionActual = computed(() => {
  return permiso.value?.versiones[indiceVersionSeleccionada.value]
})

const bancoPreguntas: Record<string, { req: string; res: Record<string, string> }[]> = {
    'tt-1': [
        { req: 'Altura de la tarea a realizar', res: { 'r1': 'Menor a 2 metros', 'r2': 'Entre 2 y 6 metros', 'r3': 'Más de 6 metros (Gran altura)' } },
        { req: 'Tipo de sistema anticaídas', res: { 'r4': 'Arnés completo con doble cola y anclaje fijo', 'r5': 'Cinturón de posicionamiento simple', 'r6': 'Sin elementos de sujeción' } }
    ],
    'tt-3': [
        { req: 'Estado de herramientas y equipos', res: { 'r7': 'Nuevas con certificación vigente', 'r8': 'Buen estado pero sin certificación', 'r9': 'Herramientas manuales sin aislación' } },
        { req: 'Distancia a líneas de tensión', res: { 'r10': 'Fuera de la zona de peligro (> 5m)', 'r11': 'Zona de proximidad controlada', 'r12': 'Contacto directo con conductores' } }
    ]
}

const obtenerTextoRespuesta = (tipoId: string, preguntaReq: string, valorRespuesta: string) => {
    const tipo = bancoPreguntas[tipoId]
    if (!tipo) return valorRespuesta
    const pregunta = tipo.find(p => p.req === preguntaReq)
    return pregunta?.res[valorRespuesta] || valorRespuesta
}

const irAEditar = () => {
  router.push({ 
    name: 'editar-permiso', 
    params: { id: idPermiso } 
  })
}
</script>

<template>
  <div v-if="permiso && versionActual" class="max-w-5xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-200 pb-4 gap-4">
      <div>
        <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">Permiso {{ permiso.id }}</h1>
        <p class="text-sm text-slate-500 mt-1">Detalle y constancia del analisis de riesgo.</p>
      </div>
      
      <button 
        @click="router.push({ name: 'mis-permisos' })" 
        class="px-5 py-2 rounded-full border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-50 transition cursor-pointer"
      >
        Volver
      </button>
    </div>

    <div class="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-xl w-fit">
      <button
        v-for="(_, index) in permiso.versiones"
        :key="index"
        @click="indiceVersionSeleccionada = index"
        :class="indiceVersionSeleccionada === index ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
        class="px-4 py-2 text-xs font-black uppercase rounded-lg transition"
      >
        Version {{ index + 1 }} {{ index === permiso.versiones.length - 1 ? '(Actual)' : '' }}
      </button>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-4">
        <div>
          <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Titulo del Trabajo</h4>
          <p class="text-base font-bold text-slate-800 mt-0.5">{{ permiso.titulo }}</p>
        </div>
        <div>
          <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Fecha Estipulada</h4>
          <p class="text-base font-bold text-slate-800 mt-0.5">{{ permiso.fechaInicio }}</p>
        </div>
      </div>

      <div>
        <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Descripcion general</h4>
        <p class="text-sm text-slate-600 mt-1 bg-slate-50 p-4 rounded-xl border border-slate-100">{{ versionActual.descripcion || 'Sin descripcion.' }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl">
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3">Peligros Identificados</h4>
                <ul class="space-y-2">
                    <li v-for="p in versionActual.peligros" :key="p.id" class="text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <span class="text-rose-500"></span> {{ p.nombre }}
                    </li>
                    <li v-if="!versionActual.peligros?.length" class="text-xs text-slate-400 italic">No se declararon peligros en esta versión.</li>
                </ul>
            </div>

            <div class="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl">
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3">Personal Asignado</h4>
                <ul class="space-y-2">
                    <li v-for="t in versionActual.trabajadores" :key="t.id" class="text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <span class="text-indigo-500"></span> {{ t.nombre }}
                    </li>
                    <li v-if="!versionActual.trabajadores?.length" class="text-xs text-slate-400 italic">No se asignó personal en esta versión.</li>
                </ul>
            </div>
        </div>
      <div class="mt-8 pt-6 border-t border-slate-200" v-if="versionActual.comentarioRechazo">
        <div class="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl space-y-2">
          <h5 class="text-xs font-black uppercase text-amber-700 tracking-wide flex items-center gap-1.5">
            Motivo del Rechazo de esta version
          </h5>
          <p class="text-sm font-medium text-amber-900 bg-white/60 p-3 rounded-xl border border-amber-100">
            {{ versionActual.comentarioRechazo }}
          </p>
          <div class="flex justify-between items-center text-[10px] font-mono text-amber-600 uppercase pt-1">
            <span>Estado: {{ permiso.estado }}</span>
            <span>Plazo limite: 3 dias</span>
          </div>
        </div>
      </div>

      <div v-if="permiso.estado === 'rechazado' && permiso.intentosReenvio > 0 && indiceVersionSeleccionada === permiso.versiones.length - 1" class="flex justify-end pt-4 border-t border-slate-100">
        <button
          @click="irAEditar"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105 text-xs cursor-pointer"
        >
          Corregir y Reenviar (Quedan {{ permiso.intentosReenvio }} intentos)
        </button>
      </div>
    </div>
  </div>
</template>