<script>

</script>

<template>
    <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white">
        <div class="max-w-md w-full text-center mb-8">
            <h1 class="text-3xl font-bold tracking-tight mb-2">Sistema de Gestión de Riesgos</h1>
            <p class="text-slate-400">Seleccione su perfil para ingresar a la plataforma de permisos de trabajo con control de riesgo</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
            <!-- Boton de Pyme -->
            <RouterLink 
                to="/pyme" 
                class="flex flex-col items-center justify-center p-8 bg-slate-800 border border-slate-700 rounded-xl shadow-md 
                hover:border-indigo-500 hover:bg-slate-750 transition duration-200 group text-center"
            >
                <span class="text-xl font-semibold mb-2 group-hover:text-indigo-400">Soy PYME</span>
                <span class="text-xs text-slate-400">Gestionar solicitudes de trabajo y ver las respuestas de los anteriores</span>
            </RouterLink>
            <!-- Boton de Administrador -->
            <RouterLink 
                to="/admin" 
                class="flex flex-col items-center justify-center p-8 bg-slate-800 border border-slate-700 rounded-xl shadow-md 
                hover:border-emerald-500 hover:bg-slate-750 transition duration-200 group text-center"
            >
                <span class="text-xl font-semibold mb-2 group-hover:text-emerald-400">Soy Administrador</span>
                <span class="text-xs text-slate-400">Auditar solicitudes de trabajo y revisar historial de los mismos.</span>
            </RouterLink>
        </div>
    </div>
</template>

<style>

</style>