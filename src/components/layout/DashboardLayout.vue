<script setup lang="ts">
import { ref } from 'vue'

import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const sidebarAbierto = ref(false)

const abrirSidebar = (): void => {
  sidebarAbierto.value = true
}

const cerrarSidebar = (): void => {
  sidebarAbierto.value = false
}
</script>


<template>
  <div class="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
    <!-- Sidebar fijo en desktop -->
    <div class="hidden md:block">
      <Sidebar />
    </div>

    <!-- Overlay + sidebar off-canvas en móvil -->
    <div v-if="sidebarAbierto" class="fixed inset-0 z-40 bg-black/50 md:hidden" @click="cerrarSidebar" />

    <div class="fixed inset-y-0 left-0 z-50 w-64 md:hidden">
      <div
        class="h-full overflow-y-auto bg-slate-800 text-slate-300 shadow-xl"
        :class="sidebarAbierto ? 'translate-x-0' : '-translate-x-full'"
      >
        <Sidebar @navegar="cerrarSidebar" />
      </div>
    </div>

    <div class="flex flex-col flex-1 overflow-hidden">
      <Header @abrir-sidebar="abrirSidebar" class="h-16 shrink-0" />

      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

