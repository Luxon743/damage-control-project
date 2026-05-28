<script setup lang="ts">
import { ref, computed } from 'vue'
import InputTexto from '../comunes/InputTexto.vue'
import TextAreaInput from '../comunes/TextAreaInput.vue'
import SelectInput from '../comunes/SelectInput.vue'
import SelectorPeligros from './SelectorPeligros.vue'
import SelectorTrabajadores from './SelectorTrabajadores.vue'
import BotonPrimario from '../comunes/BotonPrimario.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'
import type { Peligro } from '../../models/Peligro'
import type { Trabajador } from '../../models/Trabajador'
import { empresas } from '../../data/empresas'
import { tiposTrabajo } from '../../data/tiposTrabajo'
import { calcularRiesgo } from '../../utils/calcularRiesgo'

const props = defineProps<{
  permisoInicial?: PermisoTrabajo
  esEdicion?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', permiso: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'> & { respuestas?: Record<string, string> }): void
  (e: 'cancelar'): void
}>()

const titulo = ref(props.permisoInicial?.titulo || '')
const descripcion = ref(props.permisoInicial?.descripcion || '')
const ubicacion = ref(props.permisoInicial?.ubicacion || '')
const fechaInicio = ref(props.permisoInicial?.fechaInicio || '')
const fechaFin = ref(props.permisoInicial?.fechaFin || '')
const empresaSolicitanteId = ref(props.permisoInicial?.empresaSolicitante?.id || '')
const empresaContratanteId = ref(props.permisoInicial?.empresaContratante?.id || '')
const tipoTrabajoId = ref(props.permisoInicial?.tipoTrabajo?.id || '')
const peligrosSeleccionados = ref<Peligro[]>(props.permisoInicial?.peligros ? [...props.permisoInicial.peligros] : [])
const trabajadoresSeleccionados = ref<Trabajador[]>(props.permisoInicial?.trabajadores ? [...props.permisoInicial.trabajadores] : [])
const errores = ref<string[]>([])

const contratistas = computed(() => empresas.filter(e => e.tipoEmpresa === 'contratista').map(e => ({ id: e.id, texto: e.nombre })))
const contratantes = computed(() => empresas.filter(e => e.tipoEmpresa === 'contratante').map(e => ({ id: e.id, texto: e.nombre })))
const tiposTrabajoOpciones = computed(() => tiposTrabajo.map(t => ({ id: t.id, texto: t.nombre })))

const riesgoCalculado = computed(() => {
  if (!tipoTrabajoId.value || trabajadoresSeleccionados.value.length === 0 || peligrosSeleccionados.value.length === 0) return null
  const tipo = tiposTrabajo.find(t => t.id === tipoTrabajoId.value)
  if (!tipo) return null
  return calcularRiesgo(tipo, peligrosSeleccionados.value, trabajadoresSeleccionados.value)
})

const riesgoTexto = computed(() => {
  if (riesgoCalculado.value === null) return '—'
  switch (riesgoCalculado.value) {
    case 'bajo': return 'Bajo'
    case 'medio': return 'Medio'
    case 'alto': return 'Alto'
  }
})

const validar = (): boolean => {
  errores.value = []
  if (!titulo.value.trim()) errores.value.push('El título es obligatorio.')
  if (!fechaInicio.value) errores.value.push('La fecha de inicio es obligatoria.')
  if (!fechaFin.value) errores.value.push('La fecha de fin es obligatoria.')
  if (!empresaSolicitanteId.value) errores.value.push('Seleccioná una empresa solicitante.')
  if (!empresaContratanteId.value) errores.value.push('Seleccioná una empresa contratante.')
  if (!tipoTrabajoId.value) errores.value.push('Seleccioná un tipo de trabajo.')
  if (peligrosSeleccionados.value.length === 0) errores.value.push('Seleccioná al menos un peligro.')
  if (trabajadoresSeleccionados.value.length === 0) errores.value.push('Asigná al menos un trabajador.')
  return errores.value.length === 0
}

const enviar = () => {
  if (!validar()) return

  const empresaSol = empresas.find(e => e.id === empresaSolicitanteId.value)!
  const empresaCont = empresas.find(e => e.id === empresaContratanteId.value)!
  const tipoTrabajo = tiposTrabajo.find(t => t.id === tipoTrabajoId.value)!

  emit('submit', {
    titulo: titulo.value,
    descripcion: descripcion.value,
    ubicacion: ubicacion.value,
    fechaInicio: fechaInicio.value,
    fechaFin: fechaFin.value,
    empresaSolicitante: empresaSol,
    empresaContratante: empresaCont,
    tipoTrabajo: tipoTrabajo,
    peligros: peligrosSeleccionados.value,
    trabajadores: trabajadoresSeleccionados.value,
    riesgo: riesgoCalculado.value || 'bajo',
    respuestas: {}
  })
}
</script>

<template>
  <form @submit.prevent="enviar" class="space-y-8 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl max-h-[75vh] overflow-y-auto">
    <!-- Campos obligatorios bloqueados en edición -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputTexto v-model:modelo="titulo" etiqueta="Título del trabajo" obligatorio :deshabilitado="esEdicion" />
      <InputTexto v-model:modelo="ubicacion" etiqueta="Ubicación" :deshabilitado="esEdicion" />
      <InputTexto v-model:modelo="fechaInicio" tipo="date" etiqueta="Fecha inicio" obligatorio />
      <InputTexto v-model:modelo="fechaFin" tipo="date" etiqueta="Fecha fin" obligatorio />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectInput v-model:modelo="empresaSolicitanteId" :opciones="contratistas" etiqueta="Empresa solicitante (PyME)" obligatorio :deshabilitado="esEdicion" />
      <SelectInput v-model:modelo="empresaContratanteId" :opciones="contratantes" etiqueta="Empresa contratante" obligatorio :deshabilitado="esEdicion" />
    </div>

    <SelectInput v-model:modelo="tipoTrabajoId" :opciones="tiposTrabajoOpciones" etiqueta="Tipo de trabajo" obligatorio :deshabilitado="esEdicion" />

    <TextAreaInput v-model:modelo="descripcion" etiqueta="Descripción de la tarea" />

    <div class="border-t border-slate-800 pt-6 space-y-6">
      <SelectorPeligros v-model:seleccionados="peligrosSeleccionados" />
      <SelectorTrabajadores v-model:seleccionados="trabajadoresSeleccionados" />
    </div>

    <!-- Riesgo calculado -->
    <div v-if="riesgoCalculado" class="text-center bg-slate-800 p-4 rounded-2xl">
      <span class="text-xs font-black uppercase text-slate-400">Riesgo calculado:</span>
      <span class="ml-2 text-lg font-bold uppercase"
        :class="{
          'text-emerald-400': riesgoCalculado === 'bajo',
          'text-amber-400': riesgoCalculado === 'medio',
          'text-rose-400': riesgoCalculado === 'alto'
        }">
        {{ riesgoTexto }}
      </span>
    </div>

    <!-- Errores -->
    <div v-if="errores.length" class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
      <ul class="list-disc pl-5 text-sm text-rose-400 space-y-1">
        <li v-for="error in errores" :key="error">{{ error }}</li>
      </ul>
    </div>

    <!-- Botones -->
    <div class="flex justify-end gap-4 pt-4 border-t border-slate-800">
      <button type="button" @click="$emit('cancelar')"
        class="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-xs font-bold uppercase hover:bg-slate-800 transition">
        Cancelar
      </button>
      <BotonPrimario type="submit">
        {{ esEdicion ? 'Enviar Corrección' : 'Solicitar Permiso' }}
      </BotonPrimario>
    </div>
  </form>
</template>