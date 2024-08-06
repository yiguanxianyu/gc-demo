<script setup>
/**
 * @typedef {Object} algoInfo
 * @property {string} label
 * @property {string} key
 * @property {string} text
 * @property {array} arguments
 */

import { NButton, NCard, NDatePicker, NModal } from 'naive-ui'
import io from 'socket.io-client'
import { ref } from 'vue'

const emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: Boolean,
  algoInfo: Object
})

const dynamicText = ref('')
const progress_text = ref()
const model_closable = ref(true)
const timestamp = ref(Date.now())
let taskID = null

const socket = io('ws://127.0.0.1:5000')

socket.emit('manual-connect', function (response) {
  console.log('Received response from server:', response)
})

socket.on('task-process-output', (msg) => {
  if (taskID != msg.id) return
  dynamicText.value += msg.data
  progress_text.value.scrollTop = progress_text.value.scrollHeight
})

socket.on('task-done', (data) => {
  if (taskID != data.id) return
  dynamicText.value += '\n————————任务结束————————\n'
  progress_text.value.scrollTop = progress_text.value.scrollHeight
  model_closable.value = true
})

const userConfirmed = () => {
  const algo = props.algoInfo
  taskID = Math.round(Math.random() * 10000000)

  socket.emit('run-task', {
    'algo-key': algo.key,
    time: Math.floor(timestamp.value / 1000),
    id: taskID
  })

  dynamicText.value = '————————任务开始————————\n'
  model_closable.value = false
}

const closeModal = () => {
  emit('update:visible', false)
  dynamicText.value = ""
}
</script>

<template>
  <n-modal :closable="model_closable" preset="card" :mask-closable="false" :show="visible" @update:show="closeModal"
    :title="algoInfo.label" aria-modal="true" role="dialog" size="huge" style="width: 800px">
    <template #footer>
      <n-button type="primary" @click="userConfirmed">执行</n-button>
    </template>

    <template #header-extra>
      <n-date-picker :type="algoInfo.timeType" v-model:value="timestamp" default-time="12:00:00" />
    </template>

    <template #default>
      <n-card id="algo_text">{{ algoInfo.text }}</n-card>
      <n-card id="progress">
        <div id="progress_text" ref="progress_text">{{ dynamicText }}</div>
      </n-card>
    </template>

  </n-modal>
</template>

<style lang="scss" scoped>
#algo_text {
  white-space: pre-line;
  margin: 0 15px 0 0;
  overflow: auto;
}

#progress {
  margin: 10px 15px 0 0;
}

#progress_text {
  white-space: pre-line;
  height: 6em;
  overflow-y: scroll;
  font: 14px consolas
}

:deep(::-webkit-scrollbar) {
  display: none;
}
</style>
