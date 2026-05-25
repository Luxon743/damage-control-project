import type { PermisoTrabajo } from '../models/PermisoTrabajo';
import { empresas } from './empresas';
import { trabajadores } from './trabajadores';
import { tiposTrabajo } from './tiposTrabajo';
import { peligros } from './peligros';

export const permisosIniciales: PermisoTrabajo[] = [
  {
    id: 'PT-001',
    titulo: 'Cambio de luminarias en playa de tanques',
    descripcion: 'Reemplazo de 12 reflectores LED en altura sobre pasarela',
    empresaSolicitante: empresas[3]!,
    empresaContratante: empresas[0]!,
    ubicacion: 'Planta YPF – Sector 4',
    fechaInicio: '12/06/2026',
    fechaFin: '12/06/2026',
    tipoTrabajo: tiposTrabajo[0]!,
    peligros: [peligros[2]!, peligros[0]!],
    trabajadores: [trabajadores[1]!, trabajadores[3]!],
    estado: 'pendiente',
    riesgo: 'medio',
    versiones: [
      {
        descripcion: 'Trabajo con arnés y línea de vida instalada en pasarela',
        respuestas: {
          'pregunta3': 'respuesta8',
          'pregunta4': 'respuesta10'
        }
      }
    ],
    intentosReenvio: 2
  },
  {
    id: 'PT-002',
    titulo: 'Soldadura de cañería en línea de gas',
    descripcion: 'Reparación de fuga en caño de 4 pulgadas con soldadura TIG',
    empresaSolicitante: empresas[3]!,
    empresaContratante: empresas[1]!,
    ubicacion: 'Batería 8 – Zona de compresores',
    fechaInicio: '15/06/2026',
    fechaFin: '16/06/2026',
    tipoTrabajo: tiposTrabajo[1]!,
    peligros: [peligros[5]!, peligros[4]!],
    trabajadores: [trabajadores[0]!, trabajadores[2]!],
    estado: 'aprobado',
    riesgo: 'alto',
    versiones: [
      {
        descripcion: 'Se purgará la línea con nitrógeno antes de soldar',
        respuestas: {
          'pregunta1': 'respuesta1',
          'pregunta2': 'respuesta4'
        }
      }
    ],
    intentosReenvio: 2
  },
  {
    id: 'PT-003',
    titulo: 'Mantenimiento de tablero general',
    descripcion: 'Limpieza y ajuste de bornes en tablero de 380V',
    empresaSolicitante: empresas[4]!,
    empresaContratante: empresas[2]!,
    ubicacion: 'Siderca – Nave 2',
    fechaInicio: '20/06/2026',
    fechaFin: '20/06/2026',
    tipoTrabajo: tiposTrabajo[2]!,
    peligros: [peligros[1]!, peligros[6]!],
    trabajadores: [trabajadores[1]!],
    estado: 'rechazado',
    riesgo: 'alto',
    comentarioRechazo: 'Falta especificar procedimiento de bloqueo y etiquetado (LOTO)',
    versiones: [
      {
        descripcion: 'Desconexión del tablero aguas arriba sin bloqueo',
        respuestas: {
          'pregunta1': 'respuesta2',
          'pregunta2': 'respuesta5'
        },
        comentarioRechazo: 'Falta especificar procedimiento de bloqueo y etiquetado (LOTO)'
      }
    ],
    intentosReenvio: 1
  },
  {
    id: 'PT-004',
    titulo: 'Izaje de compresor nuevo',
    descripcion: 'Montaje de compresor de 2 toneladas en plataforma',
    empresaSolicitante: empresas[5]!,
    empresaContratante: empresas[0]!,
    ubicacion: 'YPF – Planta compresora',
    fechaInicio: '18/06/2026',
    fechaFin: '18/06/2026',
    tipoTrabajo: tiposTrabajo[4]!,
    peligros: [peligros[3]!, peligros[6]!],
    trabajadores: [trabajadores[3]!, trabajadores[2]!],
    estado: 'finalizado',
    riesgo: 'medio',
    versiones: [
      {
        descripcion: 'Se utilizará grúa hidráulica con eslingas certificadas',
        respuestas: {
          'pregunta3': 'respuesta7',
          'pregunta4': 'respuesta10'
        }
      }
    ],
    intentosReenvio: 2
  },
  {
    id: 'PT-005',
    titulo: 'Excavación para tendido de cables',
    descripcion: 'Zanja de 1.2 m de profundidad para cableado de fibra óptica',
    empresaSolicitante: empresas[5]!,
    empresaContratante: empresas[2]!,
    ubicacion: 'Siderca – Perímetro externo',
    fechaInicio: '22/06/2026',
    fechaFin: '23/06/2026',
    tipoTrabajo: tiposTrabajo[5]!,
    peligros: [peligros[6]!, peligros[4]!],
    trabajadores: [trabajadores[5]!],
    estado: 'pendiente',
    riesgo: 'bajo',
    versiones: [
      {
        descripcion: 'Excavación manual con entibado cada 2 metros',
        respuestas: {
          'pregunta3': 'respuesta7'
        }
      }
    ],
    intentosReenvio: 2
  }
];