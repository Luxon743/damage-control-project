<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const irA = (ruta: string) => {
  router.push(ruta)
}
</script>

<template>
  <div class="space-y-3">
    <h4 class="text-sm font-bold uppercase text-slate-400">Acciones rápidas</h4>
    <div class="flex flex-wrap gap-3">
      <button @click="irA('/admin/solicitudes')"
        class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition">
        Ver solicitudes
      </button>
      <button @click="irA('/admin/historial')"
        class="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 px-4 rounded-lg transition">
        Historial
      </button>
    </div>
  </div>
</template>