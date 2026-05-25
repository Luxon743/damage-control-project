import type { Usuario } from '../models/Usuario';

//datos iniciales
export const usuarios: Usuario[] = [
    {
        id: 'usr-1',
        nombre: 'Adrián López',
        email: 'adrian.lopez@admin.com',
        rol: 'admin',
        empresaId: 'emp-1'
    },
    {
        id: 'usr-2',
        nombre: 'Soledad Martínez',
        email: 'soledad.martinez@pyme.com',
        rol: 'pyme',
        empresaId: 'emp-4'
    },
    {
        id: 'usr-3',
        nombre: 'Diego Torres',
        email: 'diego.torres@pyme.com',
        rol: 'pyme',
        empresaId: 'emp-5'
    },
    {
        id: 'usr-4',
        nombre: 'Natalia Castro',
        email: 'natalia.castro@pyme.com',
        rol: 'pyme',
        empresaId: 'emp-6'
    }
];