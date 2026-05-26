<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import BotonPrimario from '../../components/comunes/BotonPrimario.vue'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'
import { empresas } from '../../data/empresas'
import { tiposTrabajo } from '../../data/tiposTrabajo'
import { peligros } from '../../data/peligros'
import { trabajadores } from '../../data/trabajadores'

const router = useRouter()
const route = useRoute()
const { permisos, agregarPermiso, reenviarPermiso } = usePermisos()

const titulo = ref('')
const fecha = ref('')
const descripcion = ref('')
const categoriaSeleccionada = ref('') // vieja referencia a tipo de trabajo
const respuestas = ref<Record<string, string>>({})

const esCorreccion = ref(false)
const idPermisoACorregir = ref('')

onMounted(() => {
  const idQuery = route.query.corregir
  if (idQuery && typeof idQuery === 'string') {
    const permisoExistente = permisos.value.find((p: PermisoTrabajo) => p.id === idQuery)
    if (permisoExistente) {
      esCorreccion.value = true
      idPermisoACorregir.value = permisoExistente.id
      titulo.value = permisoExistente.titulo

      const partes = permisoExistente.fechaInicio.split('/')
      if (partes.length === 3) {
        fecha.value = `${partes[2]}-${partes[1]}-${partes[0]}`
      } else {
        fecha.value = permisoExistente.fechaInicio
      }

      categoriaSeleccionada.value = permisoExistente.tipoTrabajo.nombre.toLowerCase()

      const ultima = permisoExistente.versiones[permisoExistente.versiones.length - 1]
      if (ultima) {
        descripcion.value = ultima.descripcion
        respuestas.value = { ...ultima.respuestas }
      }
    }
  }
})

// Banco de preguntas antiguo, mantenido para que el formulario funcione
const bancoPreguntas = {
  'electricidad': [
    {
      id: 'pregunta1',
      pregunta: 'Estado de herramientas y equipos',
      opciones: [
        { id: 'respuesta1', texto: 'Nuevas con certificacion vigente', valor: 1 },
        { id: 'respuesta2', texto: 'Buen estado pero sin certificacion', valor: 2 },
        { id: 'respuesta3', texto: 'Herramientas manuales sin aislacion', valor: 5 }
      ]
    },
    {
      id: 'pregunta2',
      pregunta: 'Distancia a lineas de tension',
      opciones: [
        { id: 'respuesta4', texto: 'Fuera de la zona de peligro (> 5m)', valor: 1 },
        { id: 'respuesta5', texto: 'Zona de proximidad controlada', valor: 3 },
        { id: 'respuesta6', texto: 'Contacto directo con conductores', valor: 10 }
      ]
    }
  ],
  'altura': [
    {
      id: 'pregunta3',
      pregunta: 'Altura de la tarea a realizar',
      opciones: [
        { id: 'respuesta7', texto: 'Menor a 2 metros', valor: 1 },
        { id: 'respuesta8', texto: 'Entre 2 y 6 metros', valor: 4 },
        { id: 'respuesta9', texto: 'Mas de 6 metros (Gran altura)', valor: 8 }
      ]
    },
    {
      id: 'pregunta4',
      pregunta: 'Tipo de sistema anticaidas',
      opciones: [
        { id: 'respuesta10', texto: 'Arnes completo con doble cola y anclaje fijo', valor: 1 },
        { id: 'respuesta11', texto: 'Cinturon de posicionamiento simple', valor: 6 },
        { id: 'respuesta12', texto: 'Sin elementos de sujecion', valor: 10 }
      ]
    }
  ],
  'mecanico': [
    {
      id: 'pregunta5',
      pregunta: 'Protecciones en maquinaria',
      opciones: [
        { id: 'respuesta13', texto: 'Protecciones fijas y enclavamientos OK', valor: 1 },
        { id: 'respuesta14', texto: 'Protecciones removidas por mantenimiento', valor: 5 },
        { id: 'respuesta15', texto: 'Maquina sin resguardos de fabrica', valor: 9 }
      ]
    }
  ]
}

const preguntasActuales = computed(() => {
  if (!categoriaSeleccionada.value) return []
  return bancoPreguntas[categoriaSeleccionada.value as keyof typeof bancoPreguntas] || []
})

const seleccionarCategoria = (cat: string) => {
  if (esCorreccion.value) return
  categoriaSeleccionada.value = cat
  respuestas.value = {}
}

const enviarPermiso = () => {
  if (!titulo.value || !fecha.value || !categoriaSeleccionada.value) {
    alert('Por favor completa los campos obligatorios')
    return
  }

  const totalPreguntas = preguntasActuales.value.length
  const respondidas = Object.keys(respuestas.value).length
  if (respondidas < totalPreguntas) {
    alert('Por favor responde todas las preguntas del cuestionario')
    return
  }

  // Datos placeholders (se mejorarán luego)
  const empresaContratista = empresas.find(e => e.tipoEmpresa === 'contratista') ?? empresas[3]!
  const empresaContratante = empresas.find(e => e.tipoEmpresa === 'contratante') ?? empresas[0]!
  const tipoTrabajoSeleccionado = tiposTrabajo.find(t => t.nombre.toLowerCase() === categoriaSeleccionada.value.toLowerCase()) ?? tiposTrabajo[0]!
  const peligrosSeleccionados = [peligros[0]!] // placeholder
  const trabajadoresSeleccionados = [trabajadores[0]!] // placeholder

  if (esCorreccion.value) {
    reenviarPermiso(idPermisoACorregir.value, {
      descripcion: descripcion.value,
      respuestas: respuestas.value
    })
  } else {
    const permisoAAgregar = {
      titulo: titulo.value,
      descripcion: descripcion.value,
      fechaInicio: fecha.value.split('-').reverse().join('/'),
      fechaFin: fecha.value.split('-').reverse().join('/'), // misma fecha
      empresaSolicitante: empresaContratista,
      empresaContratante: empresaContratante,
      tipoTrabajo: tipoTrabajoSeleccionado,
      peligros: peligrosSeleccionados,
      trabajadores: trabajadoresSeleccionados,
      ubicacion: 'A definir',
      respuestas: respuestas.value
    } as any

    agregarPermiso(permisoAAgregar)
  }

  router.push('/pyme')
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <div class="border-b-2 border-slate-200 pb-4">
      <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">
        {{ esCorreccion ? 'Corregir Permiso de Trabajo' : 'Nuevo permiso de trabajo' }}
      </h1>
    </div>

    <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-xs font-black uppercase text-slate-500 ml-2">titulo *</label>
          <input v-model="titulo" :disabled="esCorreccion" type="text" class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed" />
        </div>
        <div class="space-y-1">
          <label class="text-xs font-black uppercase text-slate-500 ml-2">fecha *</label>
          <input v-model="fecha" :disabled="esCorreccion" type="date" class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed" />
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-black uppercase text-slate-500 ml-2">descripcion</label>
        <textarea v-model="descripcion" rows="2" class="w-full bg-white border-2 border-slate-300 rounded-3xl px-6 py-4 focus:border-indigo-500 outline-none transition shadow-sm"></textarea>
      </div>

      <div class="space-y-4">
        <label class="text-xs font-black uppercase text-slate-500 ml-2">seleccione tipo de trabajo *</label>
        <div class="flex flex-wrap gap-4">
          <button
            v-for="(_, cat) in bancoPreguntas"
            :key="cat"
            type="button"
            @click="seleccionarCategoria(cat)"
            :disabled="esCorreccion"
            :class="[
              categoriaSeleccionada === cat ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400',
              esCorreccion && categoriaSeleccionada !== cat ? 'hidden' : ''
            ]"
            class="px-8 py-2 rounded-full border-2 text-sm font-bold uppercase transition shadow-sm disabled:cursor-not-allowed"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div v-if="categoriaSeleccionada" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <div
          v-for="pregunta in preguntasActuales"
          :key="pregunta.id"
          class="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col space-y-4"
        >
          <h3 class="font-bold text-slate-800 leading-tight border-b border-slate-100 pb-2">
            {{ pregunta.pregunta }}
          </h3>

          <div class="space-y-3">
            <label
              v-for="opcion in pregunta.opciones"
              :key="opcion.id"
              class="flex items-start gap-3 cursor-pointer group"
            >
              <div class="flex items-center h-5 mt-0.5">
                <input
                  type="radio"
                  :name="pregunta.id"
                  :value="opcion.id"
                  v-model="respuestas[pregunta.id]"
                  class="w-5 h-5 cursor-pointer text-emerald-600 border-2 border-slate-300 focus:ring-emerald-500 accent-emerald-600 focus:ring-0"
                />
              </div>
              <span class="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition">
                {{ opcion.texto }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-4 gap-3">
        <button type="button" @click="router.push('/pyme')" class="px-6 py-3 rounded-lg border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-100 transition">
          Cancelar
        </button>
        <BotonPrimario @click="enviarPermiso">
          {{ esCorreccion ? 'reenviar version' : 'enviar' }}
        </BotonPrimario>
      </div>
    </div>
  </div>
</template>