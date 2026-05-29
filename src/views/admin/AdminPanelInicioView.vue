<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import TablaPermisos from '../../components/permisos/TablaPermisos.vue'

const { permisos } = usePermisos()
const router = useRouter()

const total = computed(() => permisos.value.length)
const pendientes = computed(() => permisos.value.filter(p => p.estado === 'pendiente').length)
const aprobados = computed(() => permisos.value.filter(p => p.estado === 'aprobado').length)
const rechazados = computed(() => permisos.value.filter(p => p.estado === 'rechazado').length)
const finalizados = computed(() => permisos.value.filter(p => p.estado === 'finalizado').length)
const riesgoAlto = computed(() => permisos.value.filter(p => p.riesgo === 'alto').length)

// Últimos 5 permisos (más recientes según orden de inserción, que es el array)
const ultimosPermisos = computed(() => permisos.value.slice(-5).reverse())

// Función para manejar el click en la tabla
const irADetalle = (id: string) => {
    const permiso = permisos.value.find(p => p.id === id)
    if (!permiso) return

    // Al hacer click lo mandamos a donde deba ir
    if (permiso.estado === 'pendiente' || permiso.estado === 'rechazado') {
        router.push(`/admin/solicitudes/${id}`)
    } else {
        router.push(`/admin/historial/${id}`)
    }
}
</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-black text-white tracking-wide uppercase">
                Panel de Administración
            </h1>
            <div class="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase">
                Modo Auditor
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
                <p class="text-2xl font-bold text-white">{{ total }}</p>
                <p class="text-xs text-slate-400 uppercase font-semibold mt-1">Total</p>
            </div>
            <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center shadow-lg">
                <p class="text-2xl font-bold text-amber-400">{{ pendientes }}</p>
                <p class="text-xs text-amber-400/70 uppercase font-semibold mt-1">Pendientes</p>
            </div>
            <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center shadow-lg">
                <p class="text-2xl font-bold text-emerald-400">{{ aprobados }}</p>
                <p class="text-xs text-emerald-400/70 uppercase font-semibold mt-1">Aprobados</p>
            </div>
            <div class="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-center shadow-lg">
                <p class="text-2xl font-bold text-rose-400">{{ rechazados }}</p>
                <p class="text-xs text-rose-400/70 uppercase font-semibold mt-1">Rechazados</p>
            </div>
            <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-center shadow-lg">
                <p class="text-2xl font-bold text-blue-400">{{ finalizados }}</p>
                <p class="text-xs text-blue-400/70 uppercase font-semibold mt-1">Finalizados</p>
            </div>
            <div class="bg-rose-700/10 border border-rose-700/20 rounded-2xl p-4 text-center shadow-lg">
                <p class="text-2xl font-bold text-rose-500">{{ riesgoAlto }}</p>
                <p class="text-xs text-rose-400/70 uppercase font-semibold mt-1">Riesgo Alto</p>
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-lg font-bold text-white uppercase tracking-wide">Últimos movimientos</h2>
                <RouterLink :to="{ name: 'solicitudes' }" class="text-xs font-semibold text-indigo-400 hover:underline">
                    Ver todas las solicitudes
                </RouterLink>
            </div>
            
            <TablaPermisos :permisos="ultimosPermisos" @ver-detalle="irADetalle" />
        </div>
    </div>
</template>