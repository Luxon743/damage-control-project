<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Usuario } from '@/models/Usuario'

const props = defineProps<{
  usuarios: Usuario[]
}>()

const emit = defineEmits<{
  verDetalle: [id: string]
  editar: [id: string]
  eliminar: [id: string]
}>()

type ColumnaOrden =
  | 'nombre'
  | 'email'
  | 'rol'
  | 'empresa'

type DireccionOrden = 'asc' | 'desc'

const columnaOrden = ref<ColumnaOrden | null>(null)
const direccionOrden = ref<DireccionOrden>('asc')

const ordenRol: Record<string, number> = {
  admin: 1,
  pyme: 2
}

const ordenarPor = (columna: ColumnaOrden) => {
  if (columnaOrden.value === columna) {
    direccionOrden.value = direccionOrden.value === 'asc' ? 'desc' : 'asc'
  } else {
    columnaOrden.value = columna
    direccionOrden.value = 'asc'
  }
}

const obtenerValorOrden = (usuario: Usuario, columna: ColumnaOrden) => {
  switch (columna) {
    case 'nombre':
      return usuario.nombre.toLowerCase()

    case 'email':
      return usuario.email.toLowerCase()

    case 'rol':
      return ordenRol[usuario.rol] ?? 0

    case 'empresa':
      return usuario.empresaId.toLowerCase()

    default:
      return ''
  }
}

const usuariosOrdenados = computed(() => {
  if (!columnaOrden.value) return props.usuarios

  return [...props.usuarios].sort((a, b) => {
    const valorA = obtenerValorOrden(a, columnaOrden.value!)
    const valorB = obtenerValorOrden(b, columnaOrden.value!)

    if (typeof valorA === 'number' && typeof valorB === 'number') {
      return direccionOrden.value === 'asc'
        ? valorA - valorB
        : valorB - valorA
    }

    return direccionOrden.value === 'asc'
      ? String(valorA).localeCompare(String(valorB))
      : String(valorB).localeCompare(String(valorA))
  })
})

const iconoOrden = (columna: ColumnaOrden) => {
  if (columnaOrden.value !== columna) return '↕'
  return direccionOrden.value === 'asc' ? '↑' : '↓'
}

const claseHeader = (columna: ColumnaOrden) => {
  return columnaOrden.value === columna
    ? 'text-indigo-600'
    : 'text-slate-600 hover:text-slate-900'
}
</script>

<template>
    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table class="w-full text-left text-sm">
        <thead class="bg-slate-100">
            <tr>
            <th
                @click="ordenarPor('nombre')"
                :class="claseHeader('nombre')"
                class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
            >
                Nombre {{ iconoOrden('nombre') }}
            </th>

            <th
                @click="ordenarPor('email')"
                :class="claseHeader('email')"
                class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
            >
                Email {{ iconoOrden('email') }}
            </th>

            <th
                @click="ordenarPor('rol')"
                :class="claseHeader('rol')"
                class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
            >
                Rol {{ iconoOrden('rol') }}
            </th>

            <th
                @click="ordenarPor('empresa')"
                :class="claseHeader('empresa')"
                class="px-6 py-4 text-xs font-black uppercase tracking-wider cursor-pointer select-none transition"
            >
                Empresa {{ iconoOrden('empresa') }}
            </th>

            <th class="px-6 py-4 text-xs font-black uppercase tracking-wider text-right text-slate-600">
                Acciones
            </th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="usuario in usuariosOrdenados"
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