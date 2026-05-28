import { ref } from 'vue';
import type { PermisoTrabajo } from '../models/PermisoTrabajo';
import { permisosIniciales } from '../data/permisos';

// Estado reactivo con los datos iniciales precargados
const permisos = ref<PermisoTrabajo[]>([...permisosIniciales]);

export function usePermisos() {
  const agregarPermiso = (datos: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'>) => {
    const nuevoId = `PT-${String(permisos.value.length + 1).padStart(3, '0')}`;
    const nuevoPermiso: PermisoTrabajo = {
      id: nuevoId,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      fechaInicio: datos.fechaInicio,
      fechaFin: datos.fechaFin,
      empresaSolicitante: datos.empresaSolicitante,
      empresaContratante: datos.empresaContratante,
      tipoTrabajo: datos.tipoTrabajo,
      peligros: datos.peligros,
      trabajadores: datos.trabajadores,
      ubicacion: datos.ubicacion,
      estado: 'pendiente',
      riesgo: datos.riesgo,
      versiones: [
        {
          descripcion: datos.descripcion,
          respuestas: {}
        }
      ],
      intentosReenvio: 2
    };
    permisos.value.push(nuevoPermiso);
  };

  const reenviarPermiso = (id: string, correccion: { descripcion: string; respuestas: Record<string, string> }) => {
    const permiso = permisos.value.find(p => p.id === id);
    if (permiso && permiso.estado === 'rechazado' && permiso.intentosReenvio > 0) {
      permiso.estado = 'pendiente';
      permiso.intentosReenvio--;
      permiso.comentarioRechazo = undefined; // limpiamos el comentario viejo
      permiso.versiones.push({
        descripcion: correccion.descripcion,
        respuestas: correccion.respuestas
      });
    }
  };

  const revisarPermiso = (id: string, decision: 'aprobado' | 'rechazado', comentario?: string) => {
    const permiso = permisos.value.find(p => p.id === id);
    if (permiso && permiso.estado === 'pendiente') {
      if (decision === 'aprobado') {
        permiso.estado = 'aprobado';
      } else if (decision === 'rechazado') {
        permiso.estado = 'rechazado';
        if (comentario) {
          permiso.comentarioRechazo = comentario;
          // Agregamos el comentario a la última versión
          if (permiso.versiones.length > 0) {
            const ultimaVersion = permiso.versiones[permiso.versiones.length - 1]!;
            ultimaVersion.comentarioRechazo = comentario;
          }
        }
      }
    }
  };

  const finalizarPermiso = (id: string) => {
    const permiso = permisos.value.find(p => p.id === id);
    if (permiso && permiso.estado === 'aprobado') {
      permiso.estado = 'finalizado';
    }
  };

  return {
    permisos,
    agregarPermiso,
    reenviarPermiso,
    revisarPermiso,
    finalizarPermiso
  };
}