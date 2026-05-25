import type { Peligro } from '../models/Peligro';

export const peligros: Peligro[] = [
  {
    id: 'pel-1',
    nombre: 'Ruido excesivo',
    descripcion: 'Niveles de ruido por encima de 85 dB sin protección',
    puntajeRiesgo: 2
  },
  {
    id: 'pel-2',
    nombre: 'Descarga eléctrica',
    descripcion: 'Contacto directo o indirecto con partes energizadas',
    puntajeRiesgo: 4
  },
  {
    id: 'pel-3',
    nombre: 'Caída de altura',
    descripcion: 'Riesgo de caída desde plataformas, techos o andamios',
    puntajeRiesgo: 5
  },
  {
    id: 'pel-4',
    nombre: 'Carga suspendida',
    descripcion: 'Movimiento de cargas con grúas o aparejos',
    puntajeRiesgo: 3
  },
  {
    id: 'pel-5',
    nombre: 'Gases tóxicos',
    descripcion: 'Presencia de monóxido de carbono, sulfhídrico u otros gases',
    puntajeRiesgo: 4
  },
  {
    id: 'pel-6',
    nombre: 'Atmósfera inflamable',
    descripcion: 'Concentración de vapores o gases combustibles',
    puntajeRiesgo: 5
  },
  {
    id: 'pel-7',
    nombre: 'Golpes por objetos',
    descripcion: 'Caída de herramientas, materiales o equipos desde altura',
    puntajeRiesgo: 2
  }
];