<script setup>
import { Database, LayerGroup } from '@vicons/fa'
import { NIcon, NTabPane, NTabs } from 'naive-ui'
import DataPage from './tab_page/DataPage.vue'
import LayerPage from './tab_page/LayerPage.vue'
</script>

<template>
  <n-tabs animated class="data-tab" type="card">
    <n-tab-pane display-directive="show" name="layer">
      <LayerPage />
      <template #tab>
        <n-icon :component="LayerGroup" />
        &nbsp图层
      </template>
    </n-tab-pane>

    <n-tab-pane display-directive="show" name="data">
      <DataPage />
      <template #tab>
        <n-icon :component="Database" />
        &nbsp数据管理
      </template>
    </n-tab-pane>
  </n-tabs>
</template>

<style lang="scss" scoped>
.data-tab {
  padding: 0;
  overflow-y: hidden;
  text-overflow: ellipsis;
}

:deep(.n-tabs-pane-wrapper) {
  overflow: auto;
}

:deep(::-webkit-scrollbar) {
  // display: none;
  width: 5px;
  height: 5px;
}

:deep(::-webkit-scrollbar-track) {
  border-radius: 5px;
  background-color: #454545;
}

:deep(::-webkit-scrollbar-thumb) {
  border-radius: 5px;
  background-color: #a9a9a9;
}

:deep(::-webkit-scrollbar-corner) {
  display: none;
}
</style>
