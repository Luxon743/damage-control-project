<script setup lang="ts">
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

defineProps<{
  permisos: PermisoTrabajo[]
}>()

const emit = defineEmits<{
  (e: 'ver-detalle', id: string): void
}>()

const estadoClase = (estado: string) => {
  switch (estado) {
    case 'pendiente': return 'bg-amber-500/20 text-amber-400'
    case 'aprobado': return 'bg-emerald-500/20 text-emerald-400'
    case 'rechazado': return 'bg-rose-500/20 text-rose-400'
    case 'finalizado': return 'bg-blue-500/20 text-blue-400'
    default: return 'bg-slate-500/20 text-slate-400'
  }
}

const riesgoClase = (riesgo: string) => {
  switch (riesgo) {
    case 'bajo': return 'bg-emerald-500/20 text-emerald-400'
    case 'medio': return 'bg-amber-500/20 text-amber-400'
    case 'alto': return 'bg-rose-500/20 text-rose-400'
    default: return ''
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
    <table class="w-full text-left text-sm">
      <thead class="bg-slate-800 text-slate-300">
        <tr>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">ID</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Título</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Empresa</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Tipo</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Estado</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Riesgo</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Fecha</th>
          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider text-right">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="permiso in permisos"
          :key="permiso.id"
          class="border-t border-slate-800 hover:bg-slate-800/50 transition cursor-pointer"
          @click="emit('ver-detalle', permiso.id)"
        >
          <td class="px-6 py-4 font-mono text-slate-400">{{ permiso.id }}</td>
          <td class="px-6 py-4 font-semibold text-white">{{ permiso.titulo }}</td>
          <td class="px-6 py-4 text-slate-400">{{ permiso.empresaSolicitante.nombre }}</td>
          <td class="px-6 py-4 text-slate-400">{{ permiso.tipoTrabajo.nombre }}</td>
          <td class="px-6 py-4">
            <span :class="estadoClase(permiso.estado)" class="text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              {{ permiso.estado }}
            </span>
          </td>
          <td class="px-6 py-4">
            <span :class="riesgoClase(permiso.riesgo)" class="text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              {{ permiso.riesgo }}
            </span>
          </td>
          <td class="px-6 py-4 text-slate-500">{{ permiso.fechaInicio }}</td>
          <td class="px-6 py-4 text-right">
            <button
              @click.stop="emit('ver-detalle', permiso.id)"
              class="text-indigo-400 hover:text-indigo-300 text-xs font-black uppercase"
            >
              Ver
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="permisos.length === 0" class="text-center py-16 text-slate-500">
      No se encontraron permisos.
    </div>
  </div>
</template>