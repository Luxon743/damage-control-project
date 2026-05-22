<script setup lang="ts">
// Rutas relativas subiendo un nivel para agarrar a sus hermanos de carpeta
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
    <div class="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
    
        <Sidebar class="w-64 shrink-0" />

        <div class="flex flex-col flex-1 overflow-hidden">
            <Header class="h-16 shrink-0" />

            <main class="flex-1 overflow-y-auto p-6">
                <RouterView />
            </main>

        </div>
    </div>
</template>