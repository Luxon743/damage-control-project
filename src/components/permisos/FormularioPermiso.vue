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

const emit = defineEmits<{
  (e: 'submit', permiso: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'>): void
  (e: 'cancelar'): void
}>()

// Campos del formulario
const titulo = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const fechaInicio = ref('')
const fechaFin = ref('')
const empresaSolicitanteId = ref('')
const empresaContratanteId = ref('')
const tipoTrabajoId = ref('')
const peligrosSeleccionados = ref<Peligro[]>([])
const trabajadoresSeleccionados = ref<Trabajador[]>([])
const errores = ref<string[]>([])

// Opciones para los select
const empresasContratistas = computed(() =>
  empresas.filter(e => e.tipoEmpresa === 'contratista').map(e => ({ id: e.id, texto: e.nombre }))
)
const empresasContratantes = computed(() =>
  empresas.filter(e => e.tipoEmpresa === 'contratante').map(e => ({ id: e.id, texto: e.nombre }))
)
const tiposTrabajoOpciones = computed(() =>
  tiposTrabajo.map(t => ({ id: t.id, texto: `${t.nombre} (riesgo +${t.puntajeRiesgo})` }))
)

// Riesgo calculado
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
  if (!empresaSolicitanteId.value) errores.value.push('Debe seleccionar una empresa solicitante (contratista).')
  if (!empresaContratanteId.value) errores.value.push('Debe seleccionar una empresa contratante.')
  if (!tipoTrabajoId.value) errores.value.push('Debe seleccionar un tipo de trabajo.')
  if (peligrosSeleccionados.value.length === 0) errores.value.push('Debe seleccionar al menos un peligro.')
  if (trabajadoresSeleccionados.value.length === 0) errores.value.push('Debe asignar al menos un trabajador.')
  return errores.value.length === 0
}

const enviar = () => {
  if (!validar()) return

  const empresaSol = empresas.find(e => e.id === empresaSolicitanteId.value)!
  const empresaCont = empresas.find(e => e.id === empresaContratanteId.value)!
  const tipoTrabajo = tiposTrabajo.find(t => t.id === tipoTrabajoId.value)!
  const riesgo = calcularRiesgo(tipoTrabajo, peligrosSeleccionados.value, trabajadoresSeleccionados.value)

  emit('submit', {
    titulo: titulo.value,
    descripcion: descripcion.value,
    empresaSolicitante: empresaSol,
    empresaContratante: empresaCont,
    ubicacion: ubicacion.value || 'No especificada',
    fechaInicio: fechaInicio.value.split('-').reverse().join('/'),
    fechaFin: fechaFin.value.split('-').reverse().join('/'),
    tipoTrabajo,
    peligros: peligrosSeleccionados.value,
    trabajadores: trabajadoresSeleccionados.value,
    riesgo
  })
}
</script>

<template>
  <form @submit.prevent="enviar" class="space-y-6">
    <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputTexto v-model:modelo="titulo" etiqueta="Título del trabajo" obligatorio
          placeholder="Ej: Mantenimiento de torre" />
        <InputTexto v-model:modelo="ubicacion" etiqueta="Ubicación / Sector" />
        <InputTexto v-model:modelo="fechaInicio" tipo="date" etiqueta="Fecha inicio" obligatorio />
        <InputTexto v-model:modelo="fechaFin" tipo="date" etiqueta="Fecha fin" obligatorio />
      </div>

      <TextAreaInput v-model:modelo="descripcion" etiqueta="Descripción de la tarea" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput v-model:modelo="empresaSolicitanteId" :opciones="empresasContratistas"
          etiqueta="Empresa solicitante (PyME)" obligatorio />
        <SelectInput v-model:modelo="empresaContratanteId" :opciones="empresasContratantes"
          etiqueta="Empresa contratante" obligatorio />
      </div>

      <SelectInput v-model:modelo="tipoTrabajoId" :opciones="tiposTrabajoOpciones" etiqueta="Tipo de trabajo"
        obligatorio />

      <SelectorPeligros v-model:seleccionados="peligrosSeleccionados" />
      <SelectorTrabajadores v-model:seleccionados="trabajadoresSeleccionados" />

      <!-- Riesgo calculado -->
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

      <!-- Errores -->
      <div v-if="errores.length > 0" class="bg-rose-50 border border-rose-200 rounded-xl p-3">
        <ul class="list-disc pl-5 text-sm text-rose-700">
          <li v-for="error in errores" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div class="flex justify-end pt-4 gap-3">
        <button type="button" @click="$emit('cancelar')"
          class="px-6 py-3 rounded-lg border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-100 transition">
          Cancelar
        </button>
        <BotonPrimario type="submit">
          Enviar solicitud
        </BotonPrimario>
      </div>
    </div>
  </form>
</template>