<script setup>
import { NTabs, NTabPane, NScrollbar } from 'naive-ui'
import LayerPage from "../tab_view/LayerPage.vue";
import DataPage from "../tab_view/DataPage.vue";

</script>

<template>
    <n-tabs class="data-tab" type="card" animated>
        <n-tab-pane display-directive="show" name="layer" tab="图层">
            <LayerPage />
        </n-tab-pane>

        <n-tab-pane display-directive="show" name="data" tab="数据管理">
            <DataPage />
        </n-tab-pane>

    </n-tabs>
</template>

<style scoped lang="scss">
.data-tab {
    padding: 0;
    overflow: hidden;
}

:deep(.n-tabs-pane-wrapper) {
    overflow-y: auto
}

:deep(::-webkit-scrollbar) {
    display: none;
}
</style>