<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUsuarios } from '@/composables/useUsuarios'
import FormularioUsuario from '@/components/usuarios/FormularioUsuario.vue'
import type { Usuario } from '@/models/Usuario'

const router = useRouter()
const { agregarUsuario } = useUsuarios()

const guardarUsuario = (datos: {
    nombre: string
    email: string
    rol: Usuario['rol']
    empresaId: string
}) => {
    agregarUsuario(datos)
    router.push('/usuarios')
}
</script>

<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between border-b-2 border-slate-200 pb-4">
            <div>
                <h1 class="text-xl font-black text-slate-800 uppercase tracking-wide">
                    Crear usuario
                </h1>
                <p class="text-sm text-slate-500 mt-1">
                    Alta de nuevo usuario del sistema.
                </p>
            </div>

            <button
                @click="router.push('/usuarios')"
                class="px-5 py-2 rounded-full border-2 border-slate-300 text-xs font-bold uppercase hover:bg-slate-50 transition"
            >
                Volver
            </button>
        </div>

        <FormularioUsuario @guardar="guardarUsuario" />
    </div>
</template>