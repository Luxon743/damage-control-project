<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

// Detectamos si estamos en la zona del administrador leyendo la URL
const esAdmin = computed(() => route.path.startsWith('/admin'))

// Definimos las opciones del menu para la PYME
const enlacesPyme = [
    { 
        texto: 'Mis Pedidos', 
        ruta: '/pyme', 
        icono: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
        texto: 'Nuevo Pedido', 
        ruta: '/pyme/permisos/crear', 
        icono: 'M12 4v16m8-8H4' 
    }
]

// Definimos las opciones del menu para el Administrador
const enlacesAdmin = [
    { 
        texto: 'Pedidos Recibidos', 
        ruta: '/admin', 
        icono: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' 
    }
]

// Se decide que menu renderizar en base a la variable esAdmin
const menuActivo = computed(() => esAdmin.value ? enlacesAdmin : enlacesPyme)

// Funcion auxiliar para pintar el boton activo si la ruta actual coincide exactamente
const estaActivo = (ruta: string) => {
    return route.path === ruta
}
</script>

<template>
    <aside class="w-64 bg-slate-800 text-slate-300 flex flex-col min-h-screen shadow-xl shrink-0">
        <div class="p-6 border-b border-slate-700">
            <h2 class="text-2xl font-black text-white tracking-wider">
                {{ esAdmin ? 'ADMIN' : 'PYME' }}
            </h2>
            <p class="text-xs text-slate-400 mt-1 uppercase tracking-widest">Panel de Control</p>
        </div>

        <nav class="flex-1 px-4 py-6 space-y-2">
            <RouterLink 
                v-for="enlace in menuActivo" 
                :key="enlace.ruta" 
                :to="enlace.ruta"
                :class="[
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm',
                    estaActivo(enlace.ruta) ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-700 hover:text-white'
                ]"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="enlace.icono"></path>
                </svg>
                {{ enlace.texto }}
            </RouterLink>
        </nav>
        
        <div class="p-4 border-t border-slate-700">
            <RouterLink 
                to="/"
                class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700 hover:text-white transition-colors font-semibold text-sm"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Cambiar de Rol
            </RouterLink>
        </div>
    </aside>
</template>