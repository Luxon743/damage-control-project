<script setup lang="ts">
import type { PropType } from 'vue'

interface Opcion {
  id: string
  texto: string
}

const props = defineProps({
  modelo: { type: String, required: true },
  opciones: { type: Array as PropType<Opcion[]>, required: true },
  etiqueta: { type: String, default: '' },
  obligatorio: { type: Boolean, default: false },
  deshabilitado: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Seleccione...' }
})

const emit = defineEmits<{
  (e: 'update:modelo', valor: string): void
}>()

const actualizar = (evento: Event) => {
  const target = evento.target as HTMLSelectElement
  emit('update:modelo', target.value)
}
</script>

<template>
  <div class="space-y-1">
    <label v-if="etiqueta" class="text-xs font-black uppercase text-slate-500 ml-2">
      {{ etiqueta }} <span v-if="obligatorio" class="text-rose-500">*</span>
    </label>
    <select
      :value="modelo"
      @change="actualizar"
      :disabled="deshabilitado"
      class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed appearance-none"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="opcion in opciones" :key="opcion.id" :value="opcion.id">
        {{ opcion.texto }}
      </option>
    </select>
  </div>
</template>