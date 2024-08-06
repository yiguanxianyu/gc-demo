<script setup>
import { useUsersStore } from '@/store/user'
import { NInput } from 'naive-ui'
import { storeToRefs } from 'pinia'
import Tabs from './Tabs.vue'

const store = useUsersStore()
const { pattern } = storeToRefs(store)
</script>

<template>
  <div class="container">
    <!-- <n-input v-model:value="pattern" placeholder="搜索" /> -->
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
