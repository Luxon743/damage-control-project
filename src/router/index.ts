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

// Vistas del Modulo Usuarios
import UserListView from '../views/usuarios/UserListView.vue'
import UserCreateView from '../views/usuarios/UserCreateView.vue'
import UserEditView from '../views/usuarios/UserEditView.vue'
import UserDetailView from '../views/usuarios/UserDetailView.vue'

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
                component: PymeDashboardView
            },
            {
                path: 'pyme/permisos',
                name: 'pyme-mis-permisos',
                component: MisPermisosView
            },
            {
                path: 'pyme/permisos/crear',
                name: 'pyme-crear-permiso',
                component: CrearPermisoView
            },
            {
                path: 'pyme/permisos/:id',
                name: 'pyme-detalle-permiso',
                component: DetallePermisoPymeView,
                props: true
            },
            {
                path: 'pyme/permisos/:id/editar',
                name: 'pyme-editar-permiso',
                component: EditarPermisoView,
                props: true
            },

            // Sector del "Administrador"
            {
                path: 'admin',
                name: 'admin-dashboard',
                component: AdminDashboardView
            },
            {
                path: 'admin/solicitudes',
                name: 'admin-solicitudes',
                component: SolicitudesView
            },
            {
                path: 'admin/solicitudes/:id',
                name: 'admin-detalle-solicitud',
                component: DetalleSolicitudView,
                props: true
            },
            {
                path: 'admin/historial',
                name: 'admin-historial',
                component: HistorialPermisosView
            },

            // Apartado de Usuarios
            {
                path: 'usuarios',
                name: 'user-list',
                component: UserListView
            },
            {
                path: 'usuarios/crear',
                name: 'user-create',
                component: UserCreateView
            },
            {
                path: 'usuarios/:id',
                name: 'user-detail',
                component: UserDetailView,
                props: true
            },
            {
                path: 'usuarios/:id/editar',
                name: 'user-edit',
                component: UserEditView,
                props: true
            }
            ]
        },

        // Comodin para redirigir cualquier ruta rota a la pantalla de inicio (asi no crashea)
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

export default router