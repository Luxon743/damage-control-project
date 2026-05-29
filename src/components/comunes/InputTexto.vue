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
      class="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm disabled:bg-slate-800/50 disabled:text-slate-500 disabled:border-slate-800 disabled:cursor-not-allowed"
      style="color-scheme: dark;"
    />
  </div>
</template>