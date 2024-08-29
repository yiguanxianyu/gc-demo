<script setup>
import { useUsersStore } from '@/store/user.js'
import { Toolbox } from '@vicons/fa'
import { NCard, NIcon, NMenu, NScrollbar } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, ref } from 'vue'
import AlgoSetup from './AlgoSetupCard.vue'

const store = useUsersStore()
const { algorithms: menuAlgorithms } = storeToRefs(store)

const currAlgoInfo = ref({})
const showModal = ref(false)

const menuValueUpdate = (key, item) => {
  if (!key.startsWith('menu-')) {
    currAlgoInfo.value = item
    showModal.value = true
  }
}

onBeforeMount(() => {
  store.fetchAlgorithmsFromServer()
  store.fetchInputDataFromServer()
})
</script>

<template>
  <div class="container">
    <n-card
      :bordered="false"
      content-style="font-size:20px;text-align:
        center;line-height:40px;margin:0;padding:0;background-color=rgba(0,0,0,0)"
      size="small"
      style="position: relative; background-color: rgba(0, 0, 0, 0)"
    >
      <n-icon :component="Toolbox" style="vertical-align: middle" />
      工具箱
    </n-card>

    <n-scrollbar style="border: 1px solid #dddddd; border-radius: 5px">
      <n-menu
        :indent="18"
        :options="menuAlgorithms"
        :root-indent="12"
        default-expand-all
        @update-value="menuValueUpdate"
        accordion
      />
    </n-scrollbar>

    <AlgoSetup v-model:visible="showModal" :algo-info="currAlgoInfo" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 5px 5px 5px;
  text-align: left;
}

#button_group {
  display: flex;
  justify-content: space-between;
}
</style>
