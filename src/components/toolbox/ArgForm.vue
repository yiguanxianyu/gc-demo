<template>
  <n-list id="input_form">
    <n-list-item v-for="item in data">
      <n-thing>
        <template #header>
          <div :style="{ color: item.valid ? 'white' : '#FF6666' }">{{ item.description }}</div>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup>
import { NList, NListItem, NThing } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  argArray: {
    type: Array,
    required: true
  }
})

const data = ref([
  {
    label: '参数1',
    description: 'ddd',
    valid: true
  },
  {
    label: '参数1',
    description: 'ddd',
    valid: true
  },
  {
    label: '参数1',
    description: 'ddd',
    valid: false
  },
  {
    label: '参数1',
    description: 'ddd',
    valid: true
  }
])
</script>

<style scoped>
#input_form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
