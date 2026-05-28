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
    <div class="border-b border-slate-800 pb-4 flex items-center gap-3">
      <h1 class="text-2xl font-black text-white uppercase tracking-wide">
        Nuevo permiso de trabajo
      </h1>
    </div>
    <FormularioPermiso @submit="manejarSubmit" @cancelar="cancelar" />
  </div>
</template>