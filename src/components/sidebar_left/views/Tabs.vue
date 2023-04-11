<script setup>
import { NTabPane, NTabs } from 'naive-ui'
import LayerPage from "../tab_page/LayerPage.vue";
import DataPage from "../tab_page/DataPage.vue";
</script>

<template>
  <n-tabs animated class="data-tab" type="card">
    <n-tab-pane display-directive="show" name="layer" tab="图层">
      <LayerPage />
    </n-tab-pane>

    <n-tab-pane display-directive="show" name="data" tab="数据管理">
      <DataPage />
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
  overflow: auto
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