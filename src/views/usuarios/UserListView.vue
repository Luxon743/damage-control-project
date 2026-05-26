<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsuarios } from '../../composables/useUsuarios'
import TablaUsuarios from '../../components/usuarios/TablaUsuarios.vue'

const router = useRouter()
const { usuariosOrdenados, eliminarUsuario } = useUsuarios()

const busqueda = ref('')

const usuariosFiltrados = computed(() => {
    const texto = busqueda.value.toLowerCase().trim()

    if (!texto) return usuariosOrdenados.value

    return usuariosOrdenados.value.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.email.toLowerCase().includes(texto) ||
        usuario.rol.toLowerCase().includes(texto) ||
        usuario.empresaId.toLowerCase().includes(texto)
    )
})

const irACrearUsuario = () => {
    router.push('/usuarios/crear')
}

const verDetalle = (id: string) => {
    router.push(`/usuarios/${id}`)
}

const editarUsuario = (id: string) => {
    router.push(`/usuarios/${id}/editar`)
}

const confirmarEliminacion = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        eliminarUsuario(id)
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-xl font-black text-slate-800 tracking-wide uppercase">
                    Usuarios
                </h1>
                <p class="text-sm text-slate-500 mt-1">
                    Administración de usuarios del sistema.
                </p>
            </div>

            <button
                @click="irACrearUsuario"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105 text-xs"
            >
                Nuevo usuario
            </button>
        </div>

        <hr class="border-t-2 border-slate-300" />

        <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <input
                v-model="busqueda"
                type="text"
                placeholder="Buscar por nombre, email, rol o empresa..."
                class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm"
            />
        </div>

        <TablaUsuarios
            :usuarios="usuariosFiltrados"
            @ver-detalle="verDetalle"
            @editar="editarUsuario"
            @eliminar="confirmarEliminacion"
        />
    </div>
</template>