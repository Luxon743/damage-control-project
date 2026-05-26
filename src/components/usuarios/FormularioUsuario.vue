<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Usuario } from '@/models/Usuario'

const props = defineProps<{
    usuario?: Usuario
}>()

const emit = defineEmits<{
    guardar: [datos: {
        nombre: string
        email: string
        rol: Usuario['rol']
        empresaId: string
    }]
}>()

const nombre = ref('')
const email = ref('')
const rol = ref<Usuario['rol']>('pyme')
const empresaId = ref('')

watch(
    () => props.usuario,
    (usuario) => {
        if (usuario) {
        nombre.value = usuario.nombre
        email.value = usuario.email
        rol.value = usuario.rol
        empresaId.value = usuario.empresaId
        }
    },
    { immediate: true }
)

const enviarFormulario = () => {
    if (!nombre.value.trim() || !email.value.trim() || !empresaId.value.trim()) {
        alert('Por favor completa todos los campos obligatorios.')
        return
    }

    emit('guardar', {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        rol: rol.value,
        empresaId: empresaId.value.trim()
    })
}
</script>

<template>
    <form @submit.prevent="enviarFormulario" class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-2">
                    Nombre *
                </label>
                <input
                    v-model="nombre"
                    type="text"
                    class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm"
                    placeholder="Nombre completo"
                />
            </div>

            <div class="space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-2">
                    Email *
                </label>
                <input
                    v-model="email"
                    type="email"
                    class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm"
                    placeholder="usuario@email.com"
                    />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-2">
                    Rol *
                </label>
                <select
                    v-model="rol"
                    class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm"
                >
                    <option value="admin">Administrador</option>
                    <option value="pyme">PyME</option>
                </select>
            </div>

            <div class="space-y-1">
                <label class="text-xs font-black uppercase text-slate-500 ml-2">
                    ID Empresa *
                </label>
                <input
                    v-model="empresaId"
                    type="text"
                    class="w-full bg-white border-2 border-slate-300 rounded-full px-6 py-3 focus:border-indigo-500 outline-none transition shadow-sm"
                    placeholder="emp-1"
                />
            </div>
        </div>

        <div class="flex justify-end pt-4">
            <button
                type="submit"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105 text-xs"
            >
                Guardar usuario
            </button>
        </div>
    </form>
</template>