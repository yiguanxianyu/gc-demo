<script setup>
/**
 * @typedef {Object} algoInfo
 * @property {string} label
 * @property {string} key
 * @property {string} text
 * @property {array} arguments
 */

import { useUsersStore } from '@/store/user.js'
import axios from 'axios'
import { NButton, NCard, NModal, NSpin, useMessage, useNotification } from 'naive-ui'
import { h, ref } from 'vue'

const message = useMessage()

const noti = useNotification()

const nRef = ref(null)

const store = useUsersStore()

const props = defineProps({
  visible: Boolean,
  algoInfo: Object
})

const emit = defineEmits(['update:visible'])

const closeModal = () => {
  emit('update:visible', false)
}

const userConfirmed = () => {
  if (nRef.value !== null) {
    message.error('请先等待上一个计算任务完成并关闭窗口')
    return
  }

  const algo = props.algoInfo

  nRef.value = noti.create({
    title: algo.label + ' 计算中',
    scrollable: true,
    closable: false,
    avatar: () => h(NSpin),
    onClose: () => {
      nRef.value = null
    }
  })

  axios
    .post(import.meta.env.VITE_BACKEND_API + '/post/run', {
      'algo-key': algo.key
    })
    .then((res) => {
      nRef.value.title = algo.label + ' 计算成功'
      nRef.value.content = res.data.message
      nRef.value.avatar = null
      nRef.value.closable = true

      store.fetchDirFromServer()
      if (res.data.label !== undefined && res.data.path !== undefined) {
        store.addLayer({
          label: res.data.label,
          path: res.data.path
        })
      }
    })
    .catch((err) => {
      nRef.value.title = algo.label + ' 计算失败'
      nRef.value.content = err.response.data.message
      nRef.value.avatar = null
      nRef.value.closable = true
    })

  closeModal()
}
</script>

<template>
  <n-modal
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
      <n-button type="primary" @click="userConfirmed">执行</n-button>
    </template>

    <div id="container">
      <n-card id="algo_text" style="">{{ algoInfo.text }}</n-card>
    </div>
  </n-modal>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#algo_text {
  white-space: pre-line;
  margin: 0 15px 0 0;
  overflow: auto;
}
</style>
