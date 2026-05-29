import { createRouter, createWebHistory } from 'vue-router';

// Layout principal
import DashboardLayout from '../components/layout/DashboardLayout.vue';

// Vista Inicial (Selector de Rol: Pyme o Administrador)
import HomeView from "../views/HomeView.vue";

// Vistas del Modulo PYME
import PymeDashboardView from '../views/pyme/PymeDashboardView.vue'
import CrearPermisoView from '../views/pyme/CrearPermisoView.vue'
import MisPermisosView from '../views/pyme/MisPermisosView.vue'
import DetallePermisoPymeView from '../views/pyme/DetallePermisoPymeView.vue'
import EditarPermisoView from '../views/pyme/EditarPermisoView.vue'

// Vistas del Modulo Admin
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import SolicitudesView from '../views/admin/SolicitudesView.vue'
import HistorialPermisosView from '../views/admin/HistorialPermisosView.vue'
import DetalleSolicitudView from '../views/admin/DetalleSolicitudView.vue'
import AdminPanelInicioView from "../views/admin/AdminPanelInicioView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Home (Sin Layout): Pantalla con los dos botones grandes
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        // Apartado con Layouts
        {
            path: '/',
            component: DashboardLayout,
            children: [
                // Sector de "Pyme"
                {
                    path: 'pyme',
                    name: 'pyme-dashboard',
                    component: PymeDashboardView,
                    redirect: { name: 'mis-permisos' },
                    children: [
                        {
                            path: 'permisos',
                            name: 'mis-permisos',
                            component: MisPermisosView
                        },
                        {
                            path: 'permisos/crear',
                            name: 'crear-permiso',
                            component: CrearPermisoView
                        },
                        {
                            path: 'permisos/:id',
                            name: 'detalle-permiso',
                            component: DetallePermisoPymeView,
                            props: true
                        },
                        {
                            path: 'permisos/:id/editar',
                            name: 'editar-permiso',
                            component: EditarPermisoView,
                            props: true
                        }
                    ]
                },

                // Sector del "Administrador"
                {
                    path: 'admin',
                    name: 'admin-dashboard',
                    component: AdminDashboardView,
                    redirect: { name: 'admin-inicio' },
                    children: [
                        {
                            path: '',
                            name: 'admin-inicio',
                            component: AdminPanelInicioView
                        },
                        {
                            path: 'solicitudes', // URL: /admin/solicitudes
                            name: 'solicitudes',
                            component: SolicitudesView
                        },
                        {
                            path: 'solicitudes/:id',
                            name: 'detalle-solicitud',
                            component: DetalleSolicitudView
                        },
                        {
                            path: 'historial',
                            name: 'Historial',
                            component: HistorialPermisosView
                        },
                        {
                            path: 'historial/:id',
                            name: 'detalle-historial',
                            component: DetalleSolicitudView
                        }
                    ]
                },
            ]
        },

        // Comodin para redirigir cualquier ruta rota a la pantalla de inicio (asi no crashea)
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

export default router;