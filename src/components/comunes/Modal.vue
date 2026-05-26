<script setup lang="ts">
defineProps<{
  abierto: boolean
  titulo?: string
}>()

const emit = defineEmits<{
  (e: 'cerrar'): void
}>()
</script>

<template>
  <div v-if="abierto" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50" @click="emit('cerrar')"></div>
    <!-- Contenido -->
    <div class="relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 v-if="titulo" class="text-lg font-black text-slate-800 uppercase">{{ titulo }}</h3>
        <button @click="emit('cerrar')" class="text-slate-400 hover:text-slate-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>