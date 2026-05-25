import type { User } from '@/models/User'

export const usuariosIniciales: User[] = [
    {
        id: 1,
        nombre: 'Ana Torres',
        email: 'ana.torres@ypf.com',
        rol: 'admin'
    },
    {
        id: 2,
        nombre: 'Carlos Méndez',
        email: 'carlos.mendez@pymeindustrial.com',
        rol: 'pyme'
    },
    {
        id: 3,
        nombre: 'Lucía Fernández',
        email: 'lucia.fernandez@tecpetrol.com',
        rol: 'admin'
    }
]