<script setup lang="ts">
import type { Peligro } from '../../models/Peligro'
import { peligros as todosLosPeligros } from '../../data/peligros'

const props = defineProps<{
  seleccionados: Peligro[]
}>()

const emit = defineEmits<{
  (e: 'update:seleccionados', valor: Peligro[]): void
}>()

const togglePeligro = (peligro: Peligro) => {
  const yaEsta = props.seleccionados.some(p => p.id === peligro.id)
  const nuevaSeleccion = yaEsta
    ? props.seleccionados.filter(p => p.id !== peligro.id)
    : [...props.seleccionados, peligro]
  emit('update:seleccionados', nuevaSeleccion)
}

const estaSeleccionado = (id: string) => {
  return props.seleccionados.some(p => p.id === id)
}
</script>

<template>
  <div class="space-y-2">
    <p class="text-xs font-black uppercase text-slate-500 ml-2">
      Peligros asociados <span class="text-rose-500">*</span>
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
      <label v-for="peligro in todosLosPeligros" :key="peligro.id"
        class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
        <input type="checkbox" :checked="estaSeleccionado(peligro.id)" @change="togglePeligro(peligro)"
          class="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
        {{ peligro.nombre }}
      </label>
    </div>
  </div>
</template>