<script setup lang="ts">
import { useRouter } from 'vue-router'
import TarjetaPermiso from '../../permisos/TarjetaPermiso.vue'
import BotonPrimario from '../../comunes/BotonPrimario.vue'
// Importamos el puente de datos compartidos
import { usePermisos } from '../../composables/usePermisos'

const router = useRouter()
const { pedidos } = usePermisos() // Traemos los pedidos reactivos

const navegarACrear = () => {
    router.push('/pyme/permisos/crear')
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
                Pedidos de Trabajo
            </h1>
            <BotonPrimario 
                @click="navegarACrear" 
                class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1"
            >
                <span>+</span> Nuevo pedido
                </BotonPrimario>
        </div>
        <hr class="border-t-2 border-slate-300" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TarjetaPermiso 
                v-for="pedido in pedidos" 
                :key="pedido.id" 
                :permiso="pedido" 
            />
        </div>
    </div>
</template>
