export type RolUsuario = 'admin' | 'pyme';

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: RolUsuario;
    empresaId: string;
}