import type { TipoTrabajo } from '../models/TipoTrabajo';

export const tiposTrabajo: TipoTrabajo[] = [
  {
    id: 'tt-1',
    nombre: 'Trabajo en altura',
    descripcion: 'Tareas realizadas a más de 1.5 metros del suelo',
    puntajeRiesgo: 5
  },
  {
    id: 'tt-2',
    nombre: 'Trabajo en caliente',
    descripcion: 'Soldadura, corte, amolado u operaciones con llama abierta',
    puntajeRiesgo: 4
  },
  {
    id: 'tt-3',
    nombre: 'Riesgo eléctrico',
    descripcion: 'Intervención en tableros, cableado o equipos energizados',
    puntajeRiesgo: 6
  },
  {
    id: 'tt-4',
    nombre: 'Espacios confinados',
    descripcion: 'Ingreso a tanques, silos o espacios con ventilación limitada',
    puntajeRiesgo: 7
  },
  {
    id: 'tt-5',
    nombre: 'Izaje de cargas',
    descripcion: 'Uso de grúas, aparejos o elevadores para mover cargas pesadas',
    puntajeRiesgo: 5
  },
  {
    id: 'tt-6',
    nombre: 'Excavaciones',
    descripcion: 'Excavaciones de más de 1 metro de profundidad',
    puntajeRiesgo: 4
  }
];