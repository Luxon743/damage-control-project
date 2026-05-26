<script setup lang="ts">
import type { Usuario } from '@/models/Usuario'

defineProps<{
    usuario: Usuario
}>()

const emit = defineEmits<{
    verDetalle: [id: string]
}>()
</script>

<template>
    <article class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <h3 class="font-black text-slate-800 uppercase tracking-wide">
                    {{ usuario.nombre }}
                </h3>
                <p class="text-sm text-slate-500 mt-1">
                    {{ usuario.email }}
                </p>
            </div>

            <span
                class="rounded-full px-3 py-1 text-[10px] font-black uppercase"
                :class="usuario.rol === 'admin'
                ? 'bg-slate-800 text-white'
                : 'bg-emerald-100 text-emerald-700'"
            >
                {{ usuario.rol }}
            </span>
        </div>

        <div class="text-xs font-mono text-slate-400">
            Empresa: {{ usuario.empresaId }}
        </div>

        <button
            @click="emit('verDetalle', usuario.id)"
            class="text-xs font-black uppercase text-indigo-600 hover:underline"
        >
            Ver detalle
        </button>
    </article>
</template>