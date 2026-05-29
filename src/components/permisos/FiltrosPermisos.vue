<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { PermisoTrabajo, EstadoPermiso, NivelRiesgo } from '../../models/PermisoTrabajo'
import { empresas } from '../../data/empresas'
import { tiposTrabajo } from '../../data/tiposTrabajo'

const props = withDefaults(defineProps<{
    permisos: PermisoTrabajo[]
    estadosVisibles?: EstadoPermiso[]
}>(), {
    estadosVisibles: () => ['pendiente', 'aprobado', 'rechazado', 'finalizado']
})

const emit = defineEmits<{
    (e: 'update:filtrados', valor: PermisoTrabajo[]): void
}>()

const estadoFiltro = ref<EstadoPermiso | ''>('')
const riesgoFiltro = ref<NivelRiesgo | ''>('')
const empresaFiltro = ref('')
const tipoTrabajoFiltro = ref('')
const textoBusqueda = ref('')

const permisosFiltrados = computed(() => {
    let resultado = props.permisos

    if (estadoFiltro.value) {
        resultado = resultado.filter(p => p.estado === estadoFiltro.value)
    }
    if (riesgoFiltro.value) {
        resultado = resultado.filter(p => p.riesgo === riesgoFiltro.value)
    }
    if (empresaFiltro.value) {
        resultado = resultado.filter(
            p =>
                p.empresaSolicitante.id === empresaFiltro.value ||
                p.empresaContratante.id === empresaFiltro.value
        )
    }
    if (tipoTrabajoFiltro.value) {
        resultado = resultado.filter(p => p.tipoTrabajo.id === tipoTrabajoFiltro.value)
    }
    if (textoBusqueda.value.trim()) {
        const busqueda = textoBusqueda.value.toLowerCase()
        resultado = resultado.filter(
            p =>
                p.titulo.toLowerCase().includes(busqueda) ||
                p.descripcion.toLowerCase().includes(busqueda) ||
                p.id.toLowerCase().includes(busqueda)
        )
    }

    return resultado
})

watchEffect(() => {
    emit('update:filtrados', permisosFiltrados.value)
})
</script>

<template>
    <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input v-model="textoBusqueda" type="text" placeholder="Buscar..."
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 outline-none" />
            <select v-model="estadoFiltro"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="">Todos los estados</option>
                <option v-if="estadosVisibles.includes('pendiente')" value="pendiente">Pendiente</option>
                <option v-if="estadosVisibles.includes('aprobado')" value="aprobado">Aprobado</option>
                <option v-if="estadosVisibles.includes('rechazado')" value="rechazado">Rechazado</option>
                <option v-if="estadosVisibles.includes('finalizado')" value="finalizado">Finalizado</option>
            </select>
            <select v-model="riesgoFiltro"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="">Todos los riesgos</option>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
            </select>
            <select v-model="empresaFiltro"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="">Todas las empresas</option>
                <option v-for="emp in empresas" :key="emp.id" :value="emp.id">{{ emp.nombre }}</option>
            </select>
            <select v-model="tipoTrabajoFiltro"
                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="">Todos los tipos</option>
                <option v-for="tipo in tiposTrabajo" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
            </select>
        </div>
    </div>
</template>