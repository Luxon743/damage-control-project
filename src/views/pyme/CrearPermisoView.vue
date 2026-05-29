<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import FormularioPermiso from '../../components/permisos/FormularioPermiso.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const router = useRouter()
const { agregarPermiso } = usePermisos()

const manejarSubmit = (datos: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'>) => {
  agregarPermiso(datos)
  router.push({ name: 'mis-permisos' })
}

const cancelar = () => {
  router.push({ name: 'mis-permisos' })
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <div class="relative flex items-center justify-center border-b border-slate-800 pb-4 min-h-14">
        <button @click="router.push({ name: 'mis-permisos' })"
            class="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
            title="Volver a mis permisos">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </button>

        <h1 class="text-2xl font-black text-white uppercase tracking-wide text-center px-12">
            Nuevo permiso de trabajo
        </h1>
    </div>
    
    <FormularioPermiso @submit="manejarSubmit" @cancelar="cancelar" />
</div>
</template>