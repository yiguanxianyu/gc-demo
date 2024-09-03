<script setup>
import Tabs from './Tabs.vue'
</script>

<template>
  <div class="container">
    <Tabs id="left-menu" />
  </div>
</template>

<style scoped>
/* Setting container css to flex can prevent Tree from overflowing */
.container {
  display: flex;
  flex-direction: column;
}
</style>
