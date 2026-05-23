<script setup lang="ts">
import { usePermisos } from '../../composables/usePermisos'
import TarjetaPermiso from '../../permisos/TarjetaPermiso.vue'

const { pedidos } = usePermisos()
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
                Administracion: Solicitudes de Trabajo
            </h1>
            
            <div class="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
                Modo Auditor
            </div>
        </div>

        <hr class="border-t-2 border-slate-300" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TarjetaPermiso 
                v-for="pedido in pedidos" 
                :key="pedido.id" 
                :permiso="pedido"
                urlBase="/admin/solicitudes" 
            />
        </div>

        <div v-if="pedidos.length === 0" class="text-center py-20">
            <p class="text-slate-400 font-medium">No hay solicitudes pendientes de revision.</p>
        </div>
    </div>
</template>