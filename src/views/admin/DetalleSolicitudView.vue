<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'
import type { PermisoTrabajo } from '../../models/PermisoTrabajo'

const route = useRoute()
const router = useRouter()
const { permisos, revisarPermiso, finalizarPermiso } = usePermisos()

const idPermiso = route.params.id as string
const permiso = computed(() => permisos.value.find((p: PermisoTrabajo) => p.id === idPermiso))

const indiceVersionSeleccionada = ref(0)
const modoRechazo = ref(false)
const comentarioRechazo = ref('')

const versionesSeguras = computed(() => permiso.value?.versiones ?? [])
const totalVersiones = computed(() => versionesSeguras.value.length)

if (totalVersiones.value > 0) {
    indiceVersionSeleccionada.value = totalVersiones.value - 1
}

const versionActual = computed(() => {
    return versionesSeguras.value[indiceVersionSeleccionada.value]
})

const bancoPreguntas: Record<string, Record<string, { req: string; res: Record<string, string> }>> = {
    'electricidad': {
        'pregunta1': { req: 'Estado de herramientas y equipos', res: { 'respuesta1': 'Nuevas con certificacion vigente', 'respuesta2': 'Buen estado pero sin certificacion', 'respuesta3': 'Herramientas manuales sin aislacion' } },
        'pregunta2': { req: 'Distancia a lineas de tension', res: { 'respuesta4': 'Fuera de la zona de peligro (> 5m)', 'respuesta5': 'Zona de proximidad controlada', 'respuesta6': 'Contacto directo con conductores' } }
    },
    'altura': {
        'pregunta3': { req: 'Altura de la tarea a realizar', res: { 'respuesta7': 'Menor a 2 metros', 'respuesta8': 'Entre 2 y 6 metros', 'respuesta9': 'Mas de 6 metros (Gran altura)' } },
        'pregunta4': { req: 'Tipo de sistema anticaidas', res: { 'respuesta10': 'Arnes completo con doble cola y anclaje fijo', 'respuesta11': 'Cinturon de posicionamiento simple', 'respuesta12': 'Sin elementos de sujecion' } }
    },
    'mecanico': {
        'pregunta5': { req: 'Protecciones en maquinaria', res: { 'respuesta13': 'Protecciones fijas y enclavamientos OK', 'respuesta14': 'Protecciones removidas por mantenimiento', 'respuesta15': 'Maquina sin resguardos de fabrica' } }
    }
}

const confirmarAprobacion = () => {
    if (confirm('¿Estas seguro de aprobar este permiso de trabajo?')) {
        revisarPermiso(idPermiso, 'aprobado')
        router.push('/admin/solicitudes')
    }
}

const confirmarRechazo = () => {
    if (!comentarioRechazo.value.trim()) {
        alert('Debes ingresar un motivo de rechazo obligatoriamente.')
        return
    }
    revisarPermiso(idPermiso, 'rechazado', comentarioRechazo.value)
    router.push('/admin/solicitudes')
}

const confirmarFinalizacion = () => {
    if (confirm('¿Estas seguro de finalizar este permiso? Una vez finalizado no podrá editarse.')) {
        finalizarPermiso(idPermiso)
        router.push('/admin/solicitudes')
    }
}
</script>

<template>
    <div v-if="permiso && versionActual" class="max-w-5xl mx-auto space-y-6">
        <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-200 pb-4 gap-4">
            <div>
                <div class="flex items-center gap-3">
                    <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">Auditoria {{ permiso.id }}
                    </h1>
                    <span class="text-[10px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md uppercase">Modo
                        Admin</span>
                </div>
                <p class="text-sm text-slate-500 mt-1">Revision del analisis de riesgo y condiciones declaradas.</p>
            </div>
            <button @click="router.push('/admin/solicitudes')"
                class="px-5 py-2 rounded-full border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-50 transition">
                Volver
            </button>
        </div>

        <div class="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-xl w-fit">
            <button v-for="(_, index) in versionesSeguras" :key="index" @click="indiceVersionSeleccionada = index"
                :class="indiceVersionSeleccionada === index ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
                class="px-4 py-2 text-xs font-black uppercase rounded-lg transition">
                Version {{ index + 1 }} {{ index === totalVersiones - 1 ? '(Actual)' : '' }}
            </button>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-4">
                <div>
                    <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Titulo del Trabajo</h4>
                    <p class="text-base font-bold text-slate-800 mt-0.5">{{ permiso.titulo }}</p>
                </div>
                <div>
                    <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Fecha Estipulada</h4>
                    <p class="text-base font-bold text-slate-800 mt-0.5">{{ permiso.fechaInicio }}</p>
                </div>
            </div>

            <div>
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Descripcion general</h4>
                <p class="text-sm text-slate-600 mt-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {{ versionActual.descripcion || 'Sin descripcion.' }}
                </p>
            </div>

            <div class="space-y-4">
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Controles Seleccionados</h4>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(opcionId, preId) in versionActual.respuestas" :key="preId"
                        class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                        <h5 class="text-xs font-black uppercase text-slate-500 tracking-wide mb-2">
                            {{ bancoPreguntas[permiso.tipoTrabajo.nombre.toLowerCase()]?.[preId]?.req ?? preId }}
                        </h5>
                        <div class="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                            <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                            <span class="text-sm font-semibold text-emerald-800">
                                {{ bancoPreguntas[permiso.tipoTrabajo.nombre.toLowerCase()]?.[preId]?.res[opcionId] ??
                                opcionId }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="versionActual.comentarioRechazo" class="mt-8 pt-6 border-t border-slate-200">
                <div class="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl space-y-2">
                    <h5 class="text-xs font-black uppercase text-amber-700 tracking-wide flex items-center gap-1.5">
                        Motivo del Rechazo de esta version
                    </h5>
                    <p class="text-sm font-medium text-amber-900 bg-white/60 p-3 rounded-xl border border-amber-100">
                        {{ versionActual.comentarioRechazo }}
                    </p>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="mt-8 pt-6 border-t-2 border-slate-200 space-y-4">
                <!-- Permiso pendiente: aprobar/rechazar -->
                <div v-if="permiso.estado === 'pendiente' && indiceVersionSeleccionada === totalVersiones - 1">
                    <div v-if="!modoRechazo" class="flex items-center justify-end gap-4">
                        <button @click="modoRechazo = true"
                            class="px-8 py-3 rounded-xl border-2 border-rose-200 text-rose-600 text-xs font-black uppercase tracking-widest hover:bg-rose-50 hover:border-rose-300 transition">
                            Rechazar Permiso
                        </button>
                        <button @click="confirmarAprobacion"
                            class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-md transition-transform hover:scale-105">
                            Aprobar Trabajo
                        </button>
                    </div>

                    <div v-else class="bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl space-y-4">
                        <h5 class="text-sm font-black uppercase text-rose-700 tracking-wide">Indicar motivo de rechazo
                            obligatoriamente</h5>
                        <textarea v-model="comentarioRechazo" rows="3"
                            placeholder="Detalla los cambios o medidas de seguridad faltantes..."
                            class="w-full bg-white border-2 border-rose-200 rounded-xl px-4 py-3 focus:border-rose-400 outline-none transition text-sm shadow-sm"></textarea>

                        <div class="flex justify-end gap-3 pt-2">
                            <button @click="modoRechazo = false"
                                class="px-6 py-2.5 rounded-lg border-2 border-slate-300 text-slate-500 text-xs font-bold uppercase hover:bg-white transition">
                                Cancelar
                            </button>
                            <button @click="confirmarRechazo"
                                class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-lg shadow-md transition">
                                Confirmar Rechazo
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Permiso aprobado: botón finalizar -->
                <div v-if="permiso.estado === 'aprobado'" class="flex justify-end">
                    <button @click="confirmarFinalizacion"
                        class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105">
                        Finalizar Permiso
                    </button>
                </div>

                <!-- Permiso finalizado: mensaje -->
                <div v-if="permiso.estado === 'finalizado'" class="flex justify-end">
                    <span class="bg-blue-100 text-blue-700 text-xs font-bold uppercase px-4 py-2 rounded-full">
                        Trabajo finalizado
                    </span>
                </div>

                <!-- Permiso rechazado: indicación -->
                <div v-if="permiso.estado === 'rechazado'" class="flex justify-end">
                    <span class="bg-amber-100 text-amber-700 text-xs font-bold uppercase px-4 py-2 rounded-full">
                        Rechazado - Esperando corrección
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>