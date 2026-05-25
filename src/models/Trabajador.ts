export type Experiencia = 'junior' | 'semi-senior' | 'senior';

export interface Trabajador {
  id: string;
  nombre: string;
  especialidad: string;
  experiencia: Experiencia;
}