export type RolUsuario = 'pyme' | 'admin'

export interface User {
    id: number
    nombre: string
    email: string
    rol: RolUsuario
}