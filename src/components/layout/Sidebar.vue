<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const emit = defineEmits<{
    (e: 'navegar'): void
}>()

const route = useRoute()

const esAdmin = computed(() => route.path.startsWith('/admin'))

const enlacesPyme = [
    {
        texto: 'Mis Permisos',
        ruta: '/pyme',
        icono: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
        texto: 'Nuevo Permiso',
        ruta: '/pyme/permisos/crear',
        icono: 'M12 4v16m8-8H4'
    }
]

const enlacesAdmin = [
    {
        texto: 'Inicio',
        ruta: '/admin',
        icono: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    {
        texto: 'Solicitudes',
        ruta: '/admin/solicitudes',
        icono: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    },
    {
        texto: 'Historial',
        ruta: '/admin/historial',
        icono: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    }
]

const menuActivo = computed(() => (esAdmin.value ? enlacesAdmin : enlacesPyme))

// Lógica para evitar bugs de múltiples enlaces activos
const estaActivo = (ruta: string): boolean => {
    const path = route.path

    if (ruta === '/pyme') {
        if (path === '/pyme/permisos/crear') return false
        return path === '/pyme' || path.startsWith('/pyme/permisos')
    }

    if (ruta === '/admin/solicitudes') {
        return path.startsWith('/admin/solicitudes')
    }

    if (ruta === '/admin/historial') {
        return path.startsWith('/admin/historial')
    }

    return path === ruta
}

const onClick = (): void => {
    emit('navegar')
}
</script>

<template>
    <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen shadow-xl shrink-0">
        <div class="p-6 border-b border-slate-800">
            <h2 class="text-2xl font-black text-white tracking-wider flex items-center gap-2">
                <span class="w-3 h-3 rounded-full" :class="esAdmin ? 'bg-amber-500' : 'bg-emerald-500'"></span>
                {{ esAdmin ? 'ADMIN' : 'PYME' }}
            </h2>
            <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest">Panel de Control</p>
        </div>

        <nav class="flex-1 px-4 py-6 space-y-2">
            <RouterLink v-for="enlace in menuActivo" :key="enlace.ruta" :to="enlace.ruta" @click="onClick" :class="[
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm',
                estaActivo(enlace.ruta)
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            ]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="enlace.icono" />
                </svg>
                {{ enlace.texto }}
            </RouterLink>
        </nav>

        <div class="p-4 border-t border-slate-800">
            <RouterLink to="/" @click="onClick"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-white transition-colors font-semibold text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cambiar de Rol
            </RouterLink>
        </div>
    </aside>
</template>