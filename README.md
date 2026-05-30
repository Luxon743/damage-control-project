# 📋 Sistema de Gestión de Permisos de Trabajo

Aplicación web SPA para registrar, gestionar y auditar solicitudes de permisos de trabajo. Este proyecto fue desarrollado implementando una arquitectura de componentes moderna con **Vue 3 + TypeScript**.

## 📌 Descripción
La plataforma está diseñada con dos vistas y roles principales:
- **PyMEs**: Pueden ingresar para crear nuevos permisos de trabajo y realizar un seguimiento del estado de sus solicitudes.
- **Administradores**: Acceden a un panel de control con estadísticas rápidas (permisos pendientes, niveles de riesgo, etc.), auditan las solicitudes de trabajo entrantes y visualizan el historial de las mismas.

Los datos se manejan de forma local mediante estados reactivos.

## ⚙️ Tecnologías
* Vue.js 3 (Composition API `<script setup>`)
* TypeScript
* Tailwind CSS
* Vue Router

## 🚀 Funcionalidades
* **Navegación por Roles**: Interfaces y paneles de navegación (Sidebars) separados para PyMEs y Administradores.
* **Dashboard Estadístico (Admin)**: Métricas en tiempo real sobre riesgos (Bajo, Medio, Alto) y estados de permisos (Aprobados, Rechazados, Finalizados).
* **Gestión de Solicitudes (PyME)**: Formulario dinámico para la creación y gestión de "Mis Permisos".
* **Auditoría e Historial**: Herramientas para revisión, aprobación o rechazo de las tareas operativas.
* **UI/UX Moderna**: Diseño completamente responsivo, con modo oscuro (`slate-950`) y componentes reutilizables (Modales, Loaders, Inputs).

## 🖥️ Uso 1
1. Clonar el repositorio en tu máquina local.
2. Abrir la terminal en la carpeta del proyecto y ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `npm run dev` para levantar el servidor de desarrollo.
4. Ingresar al enlace proporcionado en la terminal (por defecto `http://localhost:5173`) en el navegador.

## 🖥️ Uso 2
* Ingresar en este modelo de prueba: `https://luxon743.github.io/damage-control-project/`.

## 👥 Equipo de Desarrollo
* Santiago Lehnert
* Lucciano Perticarini
* Zahir Timm
* Bruno Vagnola

## 📄 Notas
Este proyecto fue desarrollado con fines educativos como parte de una práctica académica.

* **Institución:** ITS Cipolletti (Instituto Técnico Superior)
* **Carrera:** Tecnicatura Superior en Desarrollo de Software Full Stack
* **Materia:** Programación Front-End (Segundo Año)
* **Profesor:** Matías Orellana

El enfoque principal de este proyecto es la aplicación de buenas prácticas de desarrollo Frontend solicitadas para la entrega:
* **Arquitectura de Componentes:** Estructura jerárquica clara con componentes de UI reutilizables (Padre, Hijo, Nieto).
* **Flujo de Datos:** Comunicación estricta mediante `props` (descendente) y `emits` (ascendente).
* **Gestión de Estados Locales:** Uso intensivo de arreglos reactivos (`ref`) y propiedades `computed` para el filtrado, búsqueda y estadísticas sin persistencia en backend ni localstorage.
* **Tipado Estricto:** Implementación de modelos propios (ej: `PermisoTrabajo`) y uso de TypeScript en todo el proyecto.
