<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermisos } from '../../composables/usePermisos'

const route = useRoute()
const router = useRouter()
const { pedidos } = usePermisos()

const idPedido = route.params.id as string
const pedido = computed(() => pedidos.value.find(p => p.id === idPedido))

const indiceVersionSeleccionada = ref(0)

if (pedido.value) {
    indiceVersionSeleccionada.value = pedido.value.versiones.length - 1
}

const versionActual = computed(() => {
    return pedido.value?.versiones[indiceVersionSeleccionada.value]
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

const irAEditar = () => {
    router.push(`/pyme/permisos/crear?corregir=${idPedido}`)
}
</script>

<template>
    <div v-if="pedido && versionActual" class="max-w-5xl mx-auto space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-200 pb-4 gap-4">
            <div>
                <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">Pedido {{ pedido.id }}</h1>
                <p class="text-sm text-slate-500 mt-1">Detalle y constancia del analisis de riesgo.</p>
            </div>
            <button @click="router.push('/pyme')" class="px-5 py-2 rounded-full border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-50 transition">
                Volver
            </button>
        </div>

        <div class="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-xl w-fit">
            <button 
                v-for="(_, index) in pedido.versiones" 
                :key="index"
                @click="indiceVersionSeleccionada = index"
                :class="indiceVersionSeleccionada === index ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
                class="px-4 py-2 text-xs font-black uppercase rounded-lg transition"
            >
                Version {{ index + 1 }} {{ index === pedido.versiones.length - 1 ? '(Actual)' : '' }}
            </button>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-4">
                <div>
                    <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Titulo del Trabajo</h4>
                    <p class="text-base font-bold text-slate-800 mt-0.5">{{ pedido.titulo }}</p>
                </div>
                <div>
                    <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Fecha Estipulada</h4>
                    <p class="text-base font-bold text-slate-800 mt-0.5">{{ pedido.fecha }}</p>
                </div>
            </div>

            <div>
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Descripcion general</h4>
                <p class="text-sm text-slate-600 mt-1 bg-slate-50 p-4 rounded-xl border border-slate-100">{{ versionActual.descripcion || 'Sin descripcion.' }}</p>
            </div>

            <div class="space-y-4">
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">Controles Seleccionados</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                        v-for="(opcionId, preId) in versionActual.respuestas" 
                        :key="preId"
                        class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
                    >
                        <h5 class="text-xs font-black uppercase text-slate-500 tracking-wide mb-2">
                            {{ bancoPreguntas[pedido.categoria]?.[preId]?.req }}
                        </h5>
                        <div class="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                            <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                            <span class="text-sm font-semibold text-emerald-800">
                                {{ bancoPreguntas[pedido.categoria]?.[preId]?.res[opcionId] }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="versionActual.comentarioAdmin" class="mt-8 pt-6 border-t border-slate-200">
                <div class="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl space-y-2">
                    <h5 class="text-xs font-black uppercase text-amber-700 tracking-wide flex items-center gap-1.5">
                        Motivo del Rechazo de esta version
                    </h5>
                    <p class="text-sm font-medium text-amber-900 bg-white/60 p-3 rounded-xl border border-amber-100">
                        {{ versionActual.comentarioAdmin }}
                    </p>
                    <div class="flex justify-between items-center text-[10px] font-mono text-amber-600 uppercase pt-1">
                        <span>Estado: {{ pedido.estado }}</span>
                        <span>Plazo limite: 3 dias</span>
                    </div>
                </div>
            </div>

            <div v-if="pedido.estado === 'rechazado' && pedido.intentosDisponibles > 0 && indiceVersionSeleccionada === pedido.versiones.length - 1" class="flex justify-end pt-4 border-t border-slate-100">
                <button 
                    @click="irAEditar"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105 text-xs"
                >
                    Corregir y Reenviar (Quedan {{ pedido.intentosDisponibles }} intentos)
                </button>
            </div>
        </div>
    </div>
</template>