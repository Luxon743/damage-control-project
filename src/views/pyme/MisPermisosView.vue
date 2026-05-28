<script setup lang="ts">
import { useRouter } from 'vue-router'
import TarjetaPermiso from '../../components/permisos/TarjetaPermiso.vue'
import { usePermisos } from '../../composables/usePermisos'

const router = useRouter()
const { permisos } = usePermisos()

</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
            Pedidos de Trabajo
      </h1>
      
      <RouterLink
        :to="{ name: 'crear-permiso' }"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm transition inline-flex items-center gap-1 cursor-pointer"
      >
        <span>+</span> Nuevo pedido
      </RouterLink>
    </div>

    <hr class="border-t-2 border-slate-300" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TarjetaPermiso
        v-for="permiso in permisos"
        :key="permiso.id"
        :permiso="permiso"
        nombreRutaDetalle="detalle-permiso"
      />
    </div>
  </div>
</template>