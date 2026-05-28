<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'
import type { Peligro } from '../../models/Peligro'
import type { Trabajador } from '../../models/Trabajador'
import { tiposTrabajo } from '../../data/tiposTrabajo'
import { empresas } from '../../data/empresas'
import { calcularRiesgo } from '../../utils/calcularRiesgo'
import SelectorPeligros from './SelectorPeligros.vue'
import SelectorTrabajadores from './SelectorTrabajadores.vue'

const props = defineProps<{
    permisoInicial?: PermisoTrabajo
    esEdicion?: boolean
}>()

const emit = defineEmits(['submit', 'cancelar'])

/*const bancoPreguntas: Record<string, { req: string; res: Record<string, string> }[]> = {
    'tt-1': [
        { req: 'Altura de la tarea a realizar', res: { 'r1': 'Menor a 2 metros', 'r2': 'Entre 2 y 6 metros', 'r3': 'Más de 6 metros (Gran altura)' } },
        { req: 'Tipo de sistema anticaídas', res: { 'r4': 'Arnés completo con doble cola y anclaje fijo', 'r5': 'Cinturón de posicionamiento simple', 'r6': 'Sin elementos de sujeción' } }
    ],
    'tt-3': [
        { req: 'Estado de herramientas y equipos', res: { 'r7': 'Nuevas con certificación vigente', 'r8': 'Buen estado pero sin certificación', 'r9': 'Herramientas manuales sin aislación' } },
        { req: 'Distancia a líneas de tensión', res: { 'r10': 'Fuera de la zona de peligro (> 5m)', 'r11': 'Zona de proximidad controlada', 'r12': 'Contacto directo con conductores' } }
    ]
}
*/
const formulario = ref({
    titulo: props.permisoInicial?.titulo || '',
    descripcion: props.permisoInicial?.descripcion || '',
    ubicacion: props.permisoInicial?.ubicacion || '',
    fechaInicio: props.permisoInicial?.fechaInicio || '',
    fechaFin: props.permisoInicial?.fechaFin || '',
    empresaSolicitanteId: props.permisoInicial?.empresaSolicitante?.id || '',
    empresaContratanteId: props.permisoInicial?.empresaContratante?.id || '',
    tipoTrabajoId: props.permisoInicial?.tipoTrabajo?.id || '',
    peligros: props.permisoInicial?.peligros ? [...props.permisoInicial.peligros] : [] as Peligro[],
    trabajadores: props.permisoInicial?.trabajadores ? [...props.permisoInicial.trabajadores] : [] as Trabajador[],
    respuestas: props.permisoInicial?.versiones?.at(-1)?.respuestas || {} as Record<string, string>
})

const contratistas = computed(() => empresas.filter(e => e.tipoEmpresa === 'contratista'))
const contratantes = computed(() => empresas.filter(e => e.tipoEmpresa === 'contratante'))
const comentarioRechazo = computed(() => props.permisoInicial?.versiones?.at(-1)?.comentarioRechazo)

const riesgoCalculado = computed(() => {
    if (!formulario.value.tipoTrabajoId || formulario.value.trabajadores.length === 0 || formulario.value.peligros.length === 0) return null
    const tipo = tiposTrabajo.find(t => t.id === formulario.value.tipoTrabajoId)
    if (!tipo) return null
    return calcularRiesgo(tipo, formulario.value.peligros, formulario.value.trabajadores)
})

const riesgoTexto = computed(() => {
    if (riesgoCalculado.value === null) return '—'
    switch (riesgoCalculado.value) {
        case 'bajo': return 'Bajo'
        case 'medio': return 'Medio'
        case 'alto': return 'Alto'
    }
})

const enviar = () => {
    const empresaSol = empresas.find(e => e.id === formulario.value.empresaSolicitanteId)!
    const empresaCont = empresas.find(e => e.id === formulario.value.empresaContratanteId)!
    const tipoTrabajo = tiposTrabajo.find(t => t.id === formulario.value.tipoTrabajoId)!

    emit('submit', {
        titulo: formulario.value.titulo,
        descripcion: formulario.value.descripcion,
        ubicacion: formulario.value.ubicacion,
        fechaInicio: formulario.value.fechaInicio,
        fechaFin: formulario.value.fechaFin,
        empresaSolicitante: empresaSol,
        empresaContratante: empresaCont,
        tipoTrabajo: tipoTrabajo,
        peligros: formulario.value.peligros,
        trabajadores: formulario.value.trabajadores,
        riesgo: riesgoCalculado.value || 'bajo',
        respuestas: formulario.value.respuestas
    })
}
</script>

<template>
    <form @submit.prevent="enviar" class="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-200">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="flex flex-col space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Título del trabajo <span class="text-rose-500">*</span></label>
                <input v-model="formulario.titulo" required type="text" :disabled="esEdicion" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed" />
            </div>

            <div class="flex flex-col space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Ubicación / Sector <span class="text-rose-500">*</span></label>
                <input v-model="formulario.ubicacion" required type="text" :disabled="esEdicion" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed" />
            </div>

            <div class="flex flex-col space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Fecha de Inicio <span class="text-rose-500">*</span></label>
                <input v-model="formulario.fechaInicio" required type="date" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-indigo-500 outline-none transition" />
            </div>

            <div class="flex flex-col space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Fecha de Fin <span class="text-rose-500">*</span></label>
                <input v-model="formulario.fechaFin" required type="date" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-indigo-500 outline-none transition" />
            </div>

            <div class="flex flex-col space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Empresa Solicitante (PyME) <span class="text-rose-500">*</span></label>
                <select v-model="formulario.empresaSolicitanteId" :disabled="esEdicion" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed">
                    <option v-for="e in contratistas" required :key="e.id" :value="e.id">{{ e.nombre }}</option>
                </select>
            </div>

            <div class="flex flex-col space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Empresa Contratante <span class="text-rose-500">*</span></label>
                <select v-model="formulario.empresaContratanteId" :disabled="esEdicion" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed">
                    <option v-for="e in contratantes" required :key="e.id" :value="e.id">{{ e.nombre }}</option>
                </select>
            </div>

            <div class="flex flex-col space-y-1 md:col-span-2">
                <label class="text-xs font-black uppercase text-slate-500 ml-1">Tipo de trabajo <span class="text-rose-500">*</span></label>
                <select v-model="formulario.tipoTrabajoId" :disabled="esEdicion" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed">
                    <option v-for="t in tiposTrabajo" required :key="t.id" :value="t.id">{{ t.nombre }}</option>
                </select>
            </div>
        </div>

        <div class="flex flex-col space-y-1">
            <label class="text-xs font-black uppercase text-slate-500 ml-1">Descripción de la tarea</label>
            <textarea v-model="formulario.descripcion" rows="3" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-indigo-500 outline-none transition"></textarea>
        </div>

        <div class="space-y-6 pt-4 border-t border-slate-200">
            <SelectorPeligros v-model:seleccionados="formulario.peligros" />
            <SelectorTrabajadores v-model:seleccionados="formulario.trabajadores" />
        </div>

        <div v-if="riesgoCalculado" class="text-center mt-4">
            <span class="text-xs font-black uppercase text-slate-500">Riesgo calculado:</span>
            <span class="ml-2 text-lg font-bold uppercase" :class="{
                'text-emerald-600': riesgoCalculado === 'bajo',
                'text-amber-600': riesgoCalculado === 'medio',
                'text-rose-600': riesgoCalculado === 'alto'
            }">
                {{ riesgoTexto }}
            </span>
        </div>

        <!--<div v-if="formulario.tipoTrabajoId && bancoPreguntas[formulario.tipoTrabajoId]" class="space-y-4 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-black uppercase text-slate-500">Controles Requeridos (Revisar y corregir)</h3>
            
            <div v-for="(pregunta, index) in bancoPreguntas[formulario.tipoTrabajoId]" :key="index" class="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                <p class="text-xs font-bold text-slate-700 uppercase tracking-wide">{{ pregunta.req }}</p>
                
                <div class="grid grid-cols-1 gap-2">
                    <label v-for="(texto, valor) in pregunta.res" :key="valor" class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent cursor-pointer text-sm font-medium text-slate-600">
                        <input type="radio" :name="'preg-' + index" :value="valor" v-model="formulario.respuestas[pregunta.req]" class="w-4 h-4 text-indigo-600 border-slate-300 cursor-pointer" />
                        <span>{{ texto }}</span>
                    </label>
                </div>
            </div>
        </div>-->

        <div v-if="esEdicion && comentarioRechazo" class="bg-rose-50 border border-rose-200 p-4 rounded-xl">
            <h5 class="text-xs font-black uppercase text-rose-700 mb-1">⚠️ Motivo del Rechazo (Auditor):</h5>
            <p class="text-sm font-medium text-rose-900">{{ comentarioRechazo }}</p>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" @click="$emit('cancelar')" class="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold uppercase hover:bg-slate-100 transition cursor-pointer">Cancelar</button>
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-sm transition cursor-pointer">
                {{ esEdicion ? 'Enviar Corrección' : 'Solicitar Permiso' }}
            </button>
        </div>
    </form>
</template>