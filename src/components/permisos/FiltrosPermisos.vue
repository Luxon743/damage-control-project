<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { PermisoTrabajo, EstadoPermiso, NivelRiesgo } from '../../models/PermisoTrabajo'
import { empresas } from '../../data/empresas'
import { tiposTrabajo } from '../../data/tiposTrabajo'

const props = defineProps<{
    permisos: PermisoTrabajo[]
}>()

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
    <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input v-model="textoBusqueda" type="text" placeholder="Buscar por texto..."
                class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
            <select v-model="estadoFiltro"
                class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm">
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
                <option value="finalizado">Finalizado</option>
            </select>
            <select v-model="riesgoFiltro"
                class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm">
                <option value="">Todos los riesgos</option>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
            </select>
            <select v-model="empresaFiltro"
                class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm">
                <option value="">Todas las empresas</option>
                <option v-for="emp in empresas" :key="emp.id" :value="emp.id">{{ emp.nombre }}</option>
            </select>
            <select v-model="tipoTrabajoFiltro"
                class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm">
                <option value="">Todos los tipos</option>
                <option v-for="tipo in tiposTrabajo" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
            </select>
        </div>
    </div>
</template>