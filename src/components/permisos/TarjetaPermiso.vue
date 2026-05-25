<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const props = defineProps<{
  permiso: PermisoTrabajo
  urlBase: string
}>()

const router = useRouter()

const estadoEstilos = computed(() => {
  switch (props.permiso.estado) {
    case 'aprobado':
      return { circulo: 'bg-emerald-500', texto: 'Aprobado', colorTexto: 'text-emerald-700' }
    case 'rechazado':
      return { circulo: 'bg-amber-500', texto: 'Rechazado', colorTexto: 'text-amber-700' }
    case 'finalizado':
      return { circulo: 'bg-blue-500', texto: 'Finalizado', colorTexto: 'text-blue-700' }
    case 'pendiente':
    default:
      return { circulo: 'bg-slate-400', texto: 'Pendiente', colorTexto: 'text-slate-500' }
  }
})

const irAlDetalle = () => {
  router.push(`${props.urlBase}/${props.permiso.id}`)
}
</script>

<template>
  <div
    @click="irAlDetalle"
    class="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 group"
  >
    <div class="flex justify-between items-start">
      <h3 class="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors line-clamp-2">
        {{ permiso.titulo }}
      </h3>

      <div class="flex flex-col items-end shrink-0 ml-2">
        <span class="h-4 w-4 rounded-full shadow-inner" :class="estadoEstilos.circulo"></span>
        <span class="text-[10px] font-semibold uppercase tracking-wider mt-1" :class="estadoEstilos.colorTexto">
          {{ estadoEstilos.texto }}
        </span>
      </div>
    </div>

    <div class="border-t border-slate-100 pt-3 font-mono text-xs text-slate-500 space-y-1">
      <div><span class="font-semibold text-slate-400">ID:</span> {{ permiso.id }}</div>
      <div><span class="font-semibold text-slate-400">Fecha:</span> {{ permiso.fechaInicio }}</div>
    </div>
  </div>
</template>