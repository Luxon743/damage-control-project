<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import FormularioPermiso from '../../components/permisos/FormularioPermiso.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const router = useRouter()
const route = useRoute()
const { agregarPermiso, reenviarPermiso, permisos } = usePermisos()

// Lógica para saber si es corrección (pendiente de integrar completamente)
// Por ahora solo creación, la corrección se podrá adaptar más adelante usando el query "corregir".
// Dejamos preparado.

const esCorreccion = false // Podría leerse de route.query.corregir

const manejarSubmit = (datos: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'>) => {
  // Siempre se crea nuevo; la edición se implementará en otra fase.
  agregarPermiso(datos)
  router.push('/pyme')
}

const cancelar = () => {
  router.push('/pyme')
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <div class="border-b-2 border-slate-200 pb-4">
      <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">
        Nuevo permiso de trabajo
      </h1>
    </div>
    <FormularioPermiso @submit="manejarSubmit" @cancelar="cancelar" />
  </div>
</template>