import { ref } from 'vue';
import type { PermisoTrabajo } from '../models/PermisoTrabajo';
import type { Peligro } from '../models/Peligro';
import type { Trabajador } from '../models/Trabajador';
import { permisosIniciales } from '../data/permisos';

const permisos = ref<PermisoTrabajo[]>([...permisosIniciales]);

export function usePermisos() {
    const agregarPermiso = (datos: Omit<PermisoTrabajo, 'id' | 'estado' | 'versiones' | 'intentosReenvio'> & { respuestas?: Record<string, string> }) => {
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
            peligros: [...datos.peligros],
            trabajadores: [...datos.trabajadores],
            ubicacion: datos.ubicacion,
            estado: 'pendiente',
            riesgo: datos.riesgo,
            versiones: [
                {
                    descripcion: datos.descripcion,
                    respuestas: datos.respuestas || {},
                    peligros: [...datos.peligros],
                    trabajadores: [...datos.trabajadores]
                }
            ],
            intentosReenvio: 2
        };
        permisos.value.push(nuevoPermiso);
    };

    const reenviarPermiso = (id: string, correccion: { descripcion: string; respuestas: Record<string, string>; peligros: Peligro[]; trabajadores: Trabajador[] }) => {
        const permiso = permisos.value.find(p => p.id === id);
        if (permiso && permiso.estado === 'rechazado' && permiso.intentosReenvio > 0) {
            permiso.estado = 'pendiente';
            permiso.intentosReenvio--;
            permiso.comentarioRechazo = undefined;
            
            permiso.descripcion = correccion.descripcion;
            permiso.peligros = [...correccion.peligros];
            permiso.trabajadores = [...correccion.trabajadores];

            permiso.versiones.push({
                descripcion: correccion.descripcion,
                respuestas: correccion.respuestas,
                peligros: [...correccion.peligros],
                trabajadores: [...correccion.trabajadores]
            });
        }
    };

    const revisarPermiso = (id: string, decision: 'aprobado' | 'rechazado', comentario?: string) => {
        const permiso = permisos.value.find(p => p.id === id);
        if (permiso && permiso.estado === 'pendiente') {
            if (decision === 'aprobado') {
                permiso.estado = 'aprobado';
            } else if (decision === 'rechazado') {
                // Si ya no le quedan intentos, pasa a finalizado
                if (permiso.intentosReenvio === 0) {
                    permiso.estado = 'finalizado';
                } else {
                    permiso.estado = 'rechazado';
                }

                if (comentario) {
                    permiso.comentarioRechazo = comentario;
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