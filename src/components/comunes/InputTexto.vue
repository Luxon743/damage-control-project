<script setup lang="ts">
const props = defineProps<{
  modelo: string
  etiqueta?: string
  placeholder?: string
  obligatorio?: boolean
  deshabilitado?: boolean
  tipo?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelo', valor: string): void
}>()

const actualizar = (evento: Event) => {
  const target = evento.target as HTMLInputElement
  emit('update:modelo', target.value)
}
</script>

<template>
  <div class="space-y-1">
    <label v-if="etiqueta" class="text-xs font-black uppercase text-slate-500 ml-2">
      {{ etiqueta }} <span v-if="obligatorio" class="text-rose-500">*</span>
    </label>
    <input
      :type="tipo ?? 'text'"
      :value="modelo"
      @input="actualizar"
      :placeholder="placeholder ?? ''"
      :disabled="deshabilitado"
      class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
    />
  </div>
</template>