import type { Trabajador } from '@/models/Trabajador'

export const trabajadoresIniciales: Trabajador[] = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        dni: '30111222',
        especialidad: 'Mecánico industrial',
        experiencia: 'senior',
        empresaId: 3
    },
    {
        id: 2,
        nombre: 'Martín López',
        dni: '33444555',
        especialidad: 'Electricista',
        experiencia: 'semi-senior',
        empresaId: 3
    },
    {
        id: 3,
        nombre: 'Sofía Ramírez',
        dni: '35666777',
        especialidad: 'Técnica en seguridad',
        experiencia: 'senior',
        empresaId: 3
    },
    {
        id: 4,
        nombre: 'Diego Castro',
        dni: '38888999',
        especialidad: 'Ayudante operativo',
        experiencia: 'junior',
        empresaId: 4
    }
]