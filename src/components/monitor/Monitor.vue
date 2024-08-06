<script setup>
import { Archive, FileImage, Memory, Tools, VectorSquare } from '@vicons/fa'
import { HardwareChip } from '@vicons/ionicons5'
import axios from 'axios'
import { NGi, NGrid, NIcon, NStatistic } from 'naive-ui'
import { onMounted, ref } from 'vue'

const monitorData = ref({
  numImages: 0,
  numVectors: 0,
  numAlgorithms: 0,
  cpuUsage: 0,
  memoryUsage: 0,
  gpuUsage: 0,
  gpuMemoryUsage: 0,
  diskUsage: 0
})

onMounted(() => {
  const interval = Number(import.meta.env.VITE_MONITOR_UPDATE_INTERVAL)

  if (interval !== 0) {
    setInterval(() => {
      axios.get(import.meta.env.VITE_BACKEND_API + '/get/monitor').then((res) => {
        monitorData.value = res.data
      })
    }, interval)
  }
})
</script>

<template>
  <div>
    <n-grid :cols="4" :rows="2" x-gap="12">
      <!-- <n-gi>
        <n-statistic :value="monitorData.numImages" class="stat-label" label="影像数量">
          <template #prefix>
            <n-icon :component="FileImage" />
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :value="monitorData.numVectors" class="stat-label" label="矢量数量">
          <template #prefix>
            <n-icon :component="VectorSquare" />
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :value="monitorData.numAlgorithms" class="stat-label" label="工具数量">
          <template #prefix>
            <n-icon :component="Tools" />
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :value="monitorData.diskUsage" class="stat-label" label="硬盘占用">
          <template #prefix>
            <n-icon :component="Archive" />
          </template>
          <template #suffix>%</template>
        </n-statistic>
      </n-gi> -->
      <n-gi>
        <n-statistic :value="monitorData.cpuUsage" class="stat-label" label="CPU占用">
          <template #prefix>
            <n-icon :component="HardwareChip" />
          </template>
          <template #suffix>%</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :value="monitorData.memoryUsage" class="stat-label" label="内存占用">
          <template #prefix>
            <n-icon :component="Memory" />
          </template>
          <template #suffix>%</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :value="monitorData.gpuUsage" class="stat-label" label="GPU占用">
          <template #prefix>
            <n-icon :component="HardwareChip" />
          </template>
          <template #suffix>%</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :value="monitorData.gpuMemoryUsage" class="stat-label" label="显存占用">
          <template #prefix>
            <n-icon :component="Memory" />
          </template>
          <template #suffix>%</template>
        </n-statistic>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
.stat-label {
  padding: 5px;
}
</style>
