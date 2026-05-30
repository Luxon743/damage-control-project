import type { Peligro } from '../models/Peligro';
import type { Trabajador } from '../models/Trabajador';
import type { TipoTrabajo } from '../models/TipoTrabajo';
import type { NivelRiesgo } from '../models/PermisoTrabajo';

/**
 * Calcula el nivel de riesgo basado en la suma de puntajes.
 * - Tipo de trabajo: su puntajeRiesgo.
 * - Peligros: suma de sus puntajesRiesgo.
 * - Trabajadores: según la experiencia, restan puntos:
 *      junior -> 0 (no resta)
 *      semi-senior -> -1
 *      senior -> -2
 *
 * Rangos:
 *   <= 6  -> bajo
 *   7-12  -> medio
 *   >= 13 -> alto
 */
export function calcularRiesgo(
  tipoTrabajo: TipoTrabajo,
  peligros: Peligro[],
  trabajadores: Trabajador[]
): NivelRiesgo {
  let puntaje = tipoTrabajo.puntajeRiesgo;

  for (const peligro of peligros) {
    puntaje += peligro.puntajeRiesgo;
  }

  for (const trabajador of trabajadores) {
    switch (trabajador.experiencia) {
      case 'semi-senior':
        puntaje -= 1;
        break;
      case 'senior':
        puntaje -= 2;
        break;
      default:
        break; // junior no afecta
    }
  }

  if (puntaje <= 6) return 'bajo';
  if (puntaje <= 12) return 'medio';
  return 'alto';
}