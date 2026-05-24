export type NivelExperiencia = 'junior' | 'semi-senior' | 'senior'

export interface Trabajador {
    id: number
    nombre: string
    dni: string
    especialidad: string
    experiencia: NivelExperiencia
    empresaId: number
}