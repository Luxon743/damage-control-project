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
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="emit('cerrar')"></div>
    
    <div class="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 z-10 text-white">
      <div class="flex justify-between items-center mb-4">
        <h3 v-if="titulo" class="text-lg font-black text-white uppercase tracking-wide">{{ titulo }}</h3>
        <button @click="emit('cerrar')" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="text-slate-300 text-sm">
        <slot />
      </div>
    </div>
  </div>
</template>