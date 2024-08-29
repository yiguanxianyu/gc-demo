<template>
  <n-modal
    :closable="model_closable"
    preset="card"
    :mask-closable="false"
    :show="visible"
    @update:show="closeModal"
    :title="algoInfo.label"
    aria-modal="true"
    role="dialog"
    size="huge"
    style="width: 800px"
  >
    <template #header-extra>
      <n-cascader
        :options="inputData[algoInfo.key]"
        check-strategy="child"
        placeholder="选择时间"
        size="small"
        v-model:value="currentSelectedTime"
        style="width: 150px"
      />
    </template>

    <template #footer>
      <n-button type="primary" @click="userConfirmed">执行</n-button>
    </template>

    <template #default>
      <n-card id="algo_text">{{ algoInfoText[currentSelectedTime] }}</n-card>
      <n-card id="progress">
        <div id="progressBox" ref="progressBox">{{ progressText }}</div>
      </n-card>
    </template>
  </n-modal>
</template>

<script setup>
/**
 * @typedef {Object} algoInfo
 * @property {string} label
 * @property {string} key
 * @property {string} text
 * @property {array} arguments
 */

import { useUsersStore } from '@/store/user.js'
import { NButton, NCard, NCascader, NModal } from 'naive-ui'
import { storeToRefs } from 'pinia'
import io from 'socket.io-client'
import { ref } from 'vue'

const emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: Boolean,
  algoInfo: Object
})

const store = useUsersStore()
const { inputData, algoInfoText } = storeToRefs(store)

const progressText = ref('')
const progressBox = ref()
const model_closable = ref(true)
const currentSelectedTime = ref()
let taskID = null

const socket = io('ws://127.0.0.1:5000')

socket.emit('manual-connect', function (response) {
  console.log('Received response from server:', response)
})

socket.on('task-process-output', (msg) => {
  if (taskID != msg.id) return
  progressText.value += msg.data
  progressBox.value.scrollTop = progressBox.value.scrollHeight
})

socket.on('task-done', (data) => {
  if (taskID != data.id) return
  progressText.value += '\n————————任务结束————————\n'
  progressBox.value.scrollTop = progressBox.value.scrollHeight
  model_closable.value = true
  store.fetchOutputDataFromServer()
})

const userConfirmed = () => {
  if (currentSelectedTime.value === undefined) return
  taskID = Math.round(Math.random() * 10000000)

  socket.emit('run-task', {
    'algo-key': props.algoInfo.key,
    path: currentSelectedTime.value.toString(),
    id: taskID
  })

  progressText.value = '————————任务开始————————\n'
  model_closable.value = false
}

const closeModal = () => {
  progressText.value = ''
  currentSelectedTime.value = null
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
#algo_text {
  white-space: pre-line;
  margin: 0 15px 0 0;
  overflow: auto;
}

#progress {
  margin: 10px 15px 0 0;
}

#progressBox {
  white-space: pre-line;
  height: 8em;
  overflow-y: scroll;
  font: 14px consolas;
}

:deep(::-webkit-scrollbar) {
  display: none;
}
</style>
