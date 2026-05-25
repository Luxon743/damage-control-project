import type { Empresa } from './Empresa';
import type { Trabajador } from './Trabajador';
import type { TipoTrabajo } from './TipoTrabajo';
import type { Peligro } from './Peligro';

export type EstadoPermiso = 'pendiente' | 'aprobado' | 'rechazado' | 'finalizado';
export type NivelRiesgo = 'bajo' | 'medio' | 'alto';

export interface VersionPermiso {
  descripcion: string;
  respuestas: Record<string, string>;
  comentarioRechazo?: string;
}

export interface PermisoTrabajo {
  id: string;
  titulo: string;
  descripcion: string;
  empresaSolicitante: Empresa;
  empresaContratante: Empresa;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  tipoTrabajo: TipoTrabajo;
  peligros: Peligro[];
  trabajadores: Trabajador[];
  estado: EstadoPermiso;
  riesgo: NivelRiesgo;
  comentarioRechazo?: string;
  versiones: VersionPermiso[];
  intentosReenvio: number; // cantidad de correcciones permitidas (empieza en 2)
}