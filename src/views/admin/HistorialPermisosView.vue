<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePermisos } from '../../composables/usePermisos'
import TarjetaPermiso from '../../components/permisos/TarjetaPermiso.vue'
import type { PermisoTrabajo, EstadoPermiso } from '../../models/PermisoTrabajo'

const { permisos } = usePermisos()

const pestanaActiva = ref<EstadoPermiso | 'todos'>('todos')

const permisosFiltrados = computed(() => {
    if (pestanaActiva.value === 'todos') return permisos.value
    return permisos.value.filter(p => p.estado === pestanaActiva.value)
})

const cambiarPestana = (estado: EstadoPermiso | 'todos') => {
    pestanaActiva.value = estado
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
                Historial de permisos
            </h1>
            <div class="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
                Registro
            </div>
        </div>

        <div class="flex flex-wrap gap-2">
            <button v-for="estado in ['todos', 'pendiente', 'aprobado', 'rechazado', 'finalizado'] as const"
                :key="estado" @click="cambiarPestana(estado)"
                :class="pestanaActiva === estado ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'"
                class="px-4 py-2 rounded-full border text-xs font-bold uppercase transition cursor-pointer">
                {{ estado === 'todos' ? 'Todos' : estado }}
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TarjetaPermiso 
                v-for="permiso in permisosFiltrados" 
                :key="permiso.id" 
                :permiso="permiso"
                nombreRutaDetalle="detalle-solicitud" 
            />
        </div>

        <div v-if="permisosFiltrados.length === 0" class="text-center py-20">
            <p class="text-slate-400 font-medium">No hay permisos en esta categoría.</p>
        </div>
    </div>
</template>