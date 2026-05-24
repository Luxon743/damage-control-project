<script setup lang="ts">
const emit = defineEmits<{
  (e: 'abrir-sidebar'): void
}>()
</script>


<template>
  <header class="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 bg-white">
    <div class="flex items-center gap-3">
      <button
        class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        type="button"
        aria-label="Abrir menú"
        @click="emit('abrir-sidebar')"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <h1 class="text-lg md:text-2xl font-bold text-slate-900">Panel de control</h1>
    </div>
  </header>
</template>

