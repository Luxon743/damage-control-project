<script setup lang="ts">
import type { Usuario } from '@/models/Usuario'

defineProps<{
    usuarios: Usuario[]
}>()

const emit = defineEmits<{
    verDetalle: [id: string]
    editar: [id: string]
    eliminar: [id: string]
}>()
</script>

<template>
    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-100 text-slate-600">
                <tr>
                    <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Email</th>
                    <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Rol</th>
                    <th class="px-6 py-4 text-xs font-black uppercase tracking-wider">Empresa</th>
                    <th class="px-6 py-4 text-xs font-black uppercase tracking-wider text-right">Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="usuario in usuarios"
                    :key="usuario.id"
                    class="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                    <td class="px-6 py-4 font-bold text-slate-800">
                        {{ usuario.nombre }}
                    </td>

                    <td class="px-6 py-4 text-slate-600">
                        {{ usuario.email }}
                    </td>

                    <td class="px-6 py-4">
                        <span
                            class="rounded-full px-3 py-1 text-[10px] font-black uppercase"
                            :class="usuario.rol === 'admin'
                                ? 'bg-slate-800 text-white'
                                : 'bg-emerald-100 text-emerald-700'"
                        >
                            {{ usuario.rol }}
                        </span>
                    </td>

                    <td class="px-6 py-4 text-slate-600 font-mono text-xs">
                        {{ usuario.empresaId }}
                    </td>

                    <td class="px-6 py-4 text-right space-x-3">
                        <button
                            @click="emit('verDetalle', usuario.id)"
                            class="text-xs font-black uppercase text-indigo-600 hover:underline"
                        >
                            Ver
                        </button>

                        <button
                            @click="emit('editar', usuario.id)"
                            class="text-xs font-black uppercase text-amber-600 hover:underline"
                        >
                            Editar
                        </button>

                        <button
                            @click="emit('eliminar', usuario.id)"
                            class="text-xs font-black uppercase text-rose-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="usuarios.length === 0" class="text-center py-16">
            <p class="text-slate-400 font-medium">
                No hay usuarios cargados.
            </p>
        </div>
    </div>
</template>