<script setup lang="ts">

</script>

<template>
    <aside class="bg-slate-900 text-white flex flex-col p-4 justify-between h-full">
        <div>
            <div class="mb-8 px-2 font-black text-lg tracking-wider text-indigo-400 uppercase">
                SGR - RIESGOS
            </div>
            <nav class="space-y-2">
                <RouterLink 
                    to="/" 
                    class="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
                >
                    ← Cambiar de Rol
                </RouterLink>

                <RouterLink 
                    to="/pyme" 
                    class="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
                    active-class="bg-indigo-600 text-white"
                >
                    Mis Pedidos
                </RouterLink>
            </nav>
        </div>
        <div class="text-xs text-slate-500 px-2 font-mono">
            primera prueba de la vista
        </div>
    </aside>
</template>