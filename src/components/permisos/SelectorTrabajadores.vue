<script setup lang="ts">
import type { Trabajador } from '../../models/Trabajador'
import { trabajadores as todosLosTrabajadores } from '../../data/trabajadores'

defineProps<{
  seleccionados: Trabajador[]
}>()

const emit = defineEmits<{
  (e: 'update:seleccionados', valor: Trabajador[]): void
}>()

const toggleTrabajador = (trabajador: Trabajador, estaSeleccionado: boolean) => {
  const nuevaSeleccion = estaSeleccionado
    ? todosLosTrabajadores.filter((t) => t.id !== trabajador.id)
    : [...todosLosTrabajadores, trabajador]
  emit('update:seleccionados', nuevaSeleccion)
}

const estaSeleccionado = (id: string, seleccionados: Trabajador[]) =>
  seleccionados.some((t) => t.id === id)
</script>

<template>
  <div class="space-y-2">
    <p class="text-xs font-black uppercase text-slate-500 ml-2">
      Trabajadores asignados <span class="text-rose-500">*</span>
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
      <label
        v-for="trabajador in todosLosTrabajadores"
        :key="trabajador.id"
        class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 p-1 rounded-lg"
      >
        <input
          type="checkbox"
          :checked="estaSeleccionado(trabajador.id, seleccionados)"
          @change="toggleTrabajador(trabajador, !estaSeleccionado(trabajador.id, seleccionados))"
          class="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        />
        {{ trabajador.nombre }} ({{ trabajador.especialidad }}, {{ trabajador.experiencia }})
      </label>
    </div>
  </div>
</template>