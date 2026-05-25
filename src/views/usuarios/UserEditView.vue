<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsuarios } from '../../composables/useUsuarios'
import FormularioUsuario from '../../components/usuarios/FormularioUsuario.vue'
import type { Usuario } from '../../models/Usuario'

const route = useRoute()
const router = useRouter()

const { obtenerUsuarioPorId, editarUsuario } = useUsuarios()

const idUsuario = route.params.id as string

const usuario = computed(() => {
    return obtenerUsuarioPorId(idUsuario)
})

const guardarCambios = (datos: {
    nombre: string
    email: string
    rol: Usuario['rol']
    empresaId: string
}) => {
    editarUsuario(idUsuario, datos)
    router.push('/usuarios')
}
</script>

<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between border-b-2 border-slate-200 pb-4">
            <div>
                <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">
                    Editar usuario
                </h1>
                <p class="text-sm text-slate-500 mt-1">
                    Modificación de datos del usuario seleccionado.
                </p>
            </div>

            <button
                @click="router.push('/usuarios')"
                class="px-5 py-2 rounded-full border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-50 transition"
            >
                Volver
            </button>
        </div>

        <FormularioUsuario
            v-if="usuario"
            :usuario="usuario"
            @guardar="guardarCambios"
        />

        <div v-else class="bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl">
            <p class="text-sm font-bold text-rose-700">
                Usuario no encontrado.
            </p>
        </div>
    </div>
</template>