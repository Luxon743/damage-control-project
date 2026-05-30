<script setup lang="ts">
import { useRouter } from 'vue-router'
import TablaPermisos from '../../components/permisos/TablaPermisos.vue'
import { usePermisos } from '../../composables/usePermisos'

const router = useRouter()
const { permisos } = usePermisos()

const verDetalle = (id: string) => {
  router.push({ name: 'detalle-permiso', params: { id } })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-black text-white tracking-wide uppercase">
        Mis Permisos
      </h1>
      <RouterLink
        :to="{ name: 'crear-permiso' }"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition inline-flex items-center gap-1"
      >
        <span>+</span> Nuevo permiso
      </RouterLink>
    </div>

    <TablaPermisos :permisos="permisos" @ver-detalle="verDetalle" />
  </div>
</template>