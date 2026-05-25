import { computed, ref } from 'vue'
import type { Usuario } from '@/models/Usuario'
import { usuarios as usuariosIniciales } from '@/data/usuarios'

// Estado reactivo con los datos iniciales precargados
const usuarios = ref<Usuario[]>([...usuariosIniciales])

export function useUsuarios() {
    const usuariosOrdenados = computed(() => {
        return [...usuarios.value].sort((a, b) => a.nombre.localeCompare(b.nombre))
    })

    const totalUsuarios = computed(() => usuarios.value.length)

    const usuariosAdmin = computed(() => {
        return usuarios.value.filter(usuario => usuario.rol === 'admin')
    })

    const usuariosPyme = computed(() => {
        return usuarios.value.filter(usuario => usuario.rol === 'pyme')
    })

    const obtenerUsuarioPorId = (id: string) => {
        return usuarios.value.find(usuario => usuario.id === id)
    }

    const agregarUsuario = (datos: {
        nombre: string
        email: string
        rol: Usuario['rol']
        empresaId: string
    }) => {
        const nuevoId = `usr-${usuarios.value.length + 1}`

        const nuevoUsuario: Usuario = {
        id: nuevoId,
        nombre: datos.nombre,
        email: datos.email,
        rol: datos.rol,
        empresaId: datos.empresaId
        }

        usuarios.value.push(nuevoUsuario)
    }

    const editarUsuario = (
        id: string,
        datos: {
        nombre: string
        email: string
        rol: Usuario['rol']
        empresaId: string
        }
    ) => {
        const usuario = usuarios.value.find(usuario => usuario.id === id)

        if (usuario) {
        usuario.nombre = datos.nombre
        usuario.email = datos.email
        usuario.rol = datos.rol
        usuario.empresaId = datos.empresaId
        }
    }

    const eliminarUsuario = (id: string) => {
        usuarios.value = usuarios.value.filter(usuario => usuario.id !== id)
    }

    return {
        usuarios,
        usuariosOrdenados,
        totalUsuarios,
        usuariosAdmin,
        usuariosPyme,
        obtenerUsuarioPorId,
        agregarUsuario,
        editarUsuario,
        eliminarUsuario
    }
}