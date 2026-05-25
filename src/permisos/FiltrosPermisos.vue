<template>
  <div class="filtros-permisos">
    <!-- Botón para mostrar u ocultar el panel de filtros -->
    <button type="button" class="toggle-button" @click="togglePanel">
      {{ showPanel ? 'Ocultar filtros' : 'Mostrar filtros' }}
    </button>

    <!-- El panel de filtros solo se ve cuando showPanel es true -->
    <div v-if="showPanel" class="panel">
      <div class="panel-row">
        <label>
          Buscar
          <!-- Búsqueda libre: título, ID o descripción -->
          <input
            type="text"
            v-model="localFilters.query"
            placeholder="Buscar por título, ID o descripción..."
          />
        </label>
      </div>

      <div class="panel-row">
        <label>
          Estado
          <select v-model="localFilters.estado">
            <option value="">Todos</option>
            <!-- Genera opciones desde la lista de estados -->
            <option v-for="item in estados" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </label>

        <label>
          Categoría
          <select v-model="localFilters.categoria">
            <option value="">Todas</option>
            <!-- Genera opciones de categoría según la lista disponible -->
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </label>
      </div>

      <div class="actions">
        <!-- Aplica los filtros actuales -->
        <button type="button" class="apply-button" @click="applyFilters">
          Aplicar
        </button>
        <!-- Limpia todos los filtros -->
        <button type="button" class="clear-button" @click="clearFilters">
          Borrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// Define cómo se ve el objeto de filtros
// query: texto de búsqueda
// estado: filtro por estado
// categoria: filtro por categoría
type Filtros = {
  query?: string
  estado?: string
  categoria?: string
}

// Props que recibe el componente desde el padre
const props = defineProps<{
  categorias?: string[] // lista de categorías que puede pasar el padre
  modelValue?: Filtros // valor para usar con v-model
}>()

// Eventos que puede emitir el componente hacia el padre
const emit = defineEmits<{
  (e: 'update:modelValue', value: Filtros): void // para v-model
  (e: 'apply', value: Filtros): void // cuando se aplican filtros
  (e: 'clear'): void // cuando se limpian filtros
}>()

// Controla si el panel está abierto o cerrado
const showPanel = ref(false)

// Categorías por defecto en caso de que el padre no envíe ninguna
const defaultCategorias = ['mecanico', 'electricidad', 'izaje']

// Lista computada de categorías usada en el select
const categorias = computed(() => props.categorias ?? defaultCategorias)

// Copia local de los filtros para editar sin actualizar al padre inmediatamente
const localFilters = ref<Filtros>({
  query: props.modelValue?.query ?? '',
  estado: props.modelValue?.estado ?? '',
  categoria: props.modelValue?.categoria ?? ''
})

// Si el valor del padre cambia, sincronizamos los filtros locales
watch(
  () => props.modelValue,
  (value) => {
    localFilters.value = {
      query: value?.query ?? '',
      estado: value?.estado ?? '',
      categoria: value?.categoria ?? ''
    }
  },
  { deep: true }
)

// Opciones fijas de estado para el select
const estados = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'aprobado', label: 'Aprobado' },
  { value: 'rechazado', label: 'Rechazado' },
  { value: 'denegado', label: 'Denegado' },
  { value: 'finalizado', label: 'Finalizado' }
]

// Cambia showPanel entre true y false
const togglePanel = () => {
  showPanel.value = !showPanel.value
}

// Envía el filtro actual al padre
const applyFilters = () => {
  emit('update:modelValue', { ...localFilters.value })
  emit('apply', { ...localFilters.value })
}

// Limpia los filtros y avisa al padre
const clearFilters = () => {
  localFilters.value = { query: '', estado: '', categoria: '' }
  emit('update:modelValue', { ...localFilters.value })
  emit('clear')
}
</script>

<style scoped>
/* Contenedor principal del componente */
.filtros-permisos {
  margin-bottom: 1.25rem;
}

/* Estilo para los botones del panel */
.toggle-button,
.apply-button,
.clear-button {
  border: none;
  cursor: pointer;
  border-radius: 0.75rem;
  padding: 0.75rem 1.15rem;
  font-weight: 700;
}

.toggle-button {
  background-color: #2563eb;
  color: white;
}

/* Panel blanco con sombra */
.panel {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

/* Filas de campos en el panel */
.panel-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Estilo de cada etiqueta y campo */
.panel-row label {
  display: flex;
  flex-direction: column;
  flex: 1 1 220px;
  min-width: 180px;
  font-size: 0.95rem;
  color: #334155;
}

/* Inputs y selects con fondo suave */
.panel-row input,
.panel-row select {
  margin-top: 0.5rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.65rem;
  background: #f8fafc;
  color: #0f172a;
}

/* Alinea los botones de acción */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.apply-button {
  background-color: #2563eb;
  color: white;
}

.clear-button {
  background-color: #e2e8f0;
  color: #0f172a;
}
</style>