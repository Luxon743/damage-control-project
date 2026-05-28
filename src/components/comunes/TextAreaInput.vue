<script setup lang="ts">
const props = defineProps<{
  modelo: string
  etiqueta?: string
  placeholder?: string
  obligatorio?: boolean
  deshabilitado?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelo', valor: string): void
}>()

const actualizar = (evento: Event) => {
  const target = evento.target as HTMLTextAreaElement
  emit('update:modelo', target.value)
}
</script>

<template>
  <div class="space-y-1">
    <label v-if="etiqueta" class="text-xs font-black uppercase text-slate-500 ml-2">
      {{ etiqueta }} <span v-if="obligatorio" class="text-rose-500">*</span>
    </label>
    <textarea
      :value="modelo"
      @input="actualizar"
      :placeholder="placeholder ?? ''"
      :disabled="deshabilitado"
      rows="3"
      class="w-full bg-black border-2 border-slate-300 rounded-3xl px-6 py-4 focus:border-indigo-500 outline-none transition shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
    ></textarea>
  </div>
</template>