<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="md:h-full md:flex md:flex-col md:min-h-0">
    <div class="md:flex-1 md:min-h-0 md:overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>