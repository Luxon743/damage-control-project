<script setup lang="ts">
import type { Usuario } from '@/models/Usuario'

defineProps<{
    usuario: Usuario
}>()
</script>

<template>
    <article class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
                <h2 class="text-xl font-black text-slate-800 uppercase tracking-wide">
                    {{ usuario.nombre }}
                </h2>
                <p class="text-sm text-slate-500 mt-1">
                    {{ usuario.email }}
                </p>
            </div>

            <span
                class="rounded-full px-4 py-1.5 text-[10px] font-black uppercase"
                :class="usuario.rol === 'admin'
                ? 'bg-slate-800 text-white'
                : 'bg-emerald-100 text-emerald-700'"
            >
                {{ usuario.rol }}
            </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    ID Usuario
                </h4>
                <p class="text-sm font-bold text-slate-800 mt-1">
                    {{ usuario.id }}
                </p>
            </div>

            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <h4 class="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Empresa asociada
                </h4>
                <p class="text-sm font-bold text-slate-800 mt-1">
                    {{ usuario.empresaId }}
                </p>
            </div>
        </div>
    </article>
</template>