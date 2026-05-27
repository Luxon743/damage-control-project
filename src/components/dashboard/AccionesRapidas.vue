<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const irA = (ruta: string) => {
    router.push(ruta)
}
</script>

<template>
    <div class="space-y-3">
        <h4 class="text-sm font-bold uppercase text-slate-600">Acciones rápidas</h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button @click="irA('/admin/solicitudes')"
                class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition">
                Ver solicitudes
            </button>
            <button @click="irA('/admin/historial')"
                class="bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition">
                Historial
            </button>
            <button @click="irA('/usuarios')"
                class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition">
                Usuarios
            </button>
            <button @click="irA('/usuarios/crear')"
                class="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition">
                Nuevo usuario
            </button>
        </div>
    </div>
</template>