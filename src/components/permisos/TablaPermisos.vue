<script setup lang="ts">
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'
import { useOrdenamientoTabla } from '../../composables/useOrdenamientoTabla'

const props = defineProps<{
  permisos: PermisoTrabajo[]
}>()

const emit = defineEmits<{
  (e: 'ver-detalle', id: string): void
}>()

type ColumnaOrden =
  | 'id'
  | 'titulo'
  | 'empresa'
  | 'tipo'
  | 'estado'
  | 'riesgo'
  | 'fecha'

const ordenRiesgo: Record<string, number> = {
  bajo: 1,
  medio: 2,
  alto: 3
}

const ordenEstado: Record<string, number> = {
  pendiente: 1,
  aprobado: 2,
  rechazado: 3,
  finalizado: 4
}

const convertirFechaAValor = (fecha: string) => {
  if (!fecha) return 0

  if (fecha.includes('-')) {
    return new Date(fecha).getTime()
  }

  if (fecha.includes('/')) {
    const [dia, mes, anio] = fecha.split('/')
    return new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime()
  }

  return 0
}

const obtenerValorOrden = (permiso: PermisoTrabajo, columna: ColumnaOrden) => {
  switch (columna) {
    case 'id':
      return permiso.id.toLowerCase()

    case 'titulo':
      return permiso.titulo.toLowerCase()

    case 'empresa':
      return permiso.empresaSolicitante.nombre.toLowerCase()

    case 'tipo':
      return permiso.tipoTrabajo.nombre.toLowerCase()

    case 'estado':
      return ordenEstado[permiso.estado] ?? 0

    case 'riesgo':
      return ordenRiesgo[permiso.riesgo] ?? 0

    case 'fecha':
      return convertirFechaAValor(permiso.fechaInicio)

    default:
      return ''
  }
}

const {
  columnaOrden,
  ordenarPor,
  itemsOrdenados: permisosOrdenados,
  iconoOrden
} = useOrdenamientoTabla<PermisoTrabajo, ColumnaOrden>(
  () => props.permisos,
  obtenerValorOrden
)

const claseHeader = (columna: ColumnaOrden) => {
  return columnaOrden.value === columna
    ? 'text-indigo-300'
    : 'text-slate-300 hover:text-white'
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
      <thead class="bg-slate-800">
        <tr>
          <th
            @click="ordenarPor('id')"
            :class="claseHeader('id')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            ID {{ iconoOrden('id') }}
          </th>

          <th
            @click="ordenarPor('titulo')"
            :class="claseHeader('titulo')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            Título {{ iconoOrden('titulo') }}
          </th>

          <th
            @click="ordenarPor('empresa')"
            :class="claseHeader('empresa')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            Empresa {{ iconoOrden('empresa') }}
          </th>

          <th
            @click="ordenarPor('tipo')"
            :class="claseHeader('tipo')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            Tipo {{ iconoOrden('tipo') }}
          </th>

          <th
            @click="ordenarPor('estado')"
            :class="claseHeader('estado')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            Estado {{ iconoOrden('estado') }}
          </th>

          <th
            @click="ordenarPor('riesgo')"
            :class="claseHeader('riesgo')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            Riesgo {{ iconoOrden('riesgo') }}
          </th>

          <th
            @click="ordenarPor('fecha')"
            :class="claseHeader('fecha')"
            class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
          >
            Fecha {{ iconoOrden('fecha') }}
          </th>

          <th class="px-6 py-4 text-xs font-black uppercase tracking-wider text-right text-slate-300">
            Acción
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="permiso in permisosOrdenados"
          :key="permiso.id"
          class="border-t border-slate-800 hover:bg-slate-800/50 transition cursor-pointer"
          @click="emit('ver-detalle', permiso.id)"
        >
          <td class="px-6 py-4 font-mono text-slate-400">
            {{ permiso.id }}
          </td>

          <td class="px-6 py-4 font-semibold text-white">
            {{ permiso.titulo }}
          </td>

          <td class="px-6 py-4 text-slate-400">
            {{ permiso.empresaSolicitante.nombre }}
          </td>

          <td class="px-6 py-4 text-slate-400">
            {{ permiso.tipoTrabajo.nombre }}
          </td>

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

          <td class="px-6 py-4 text-slate-500">
            {{ permiso.fechaInicio }}
          </td>

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