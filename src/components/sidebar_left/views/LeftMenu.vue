<script setup>
import {NTabs, NTabPane, NScrollbar} from 'naive-ui'
import LayerPage from "../layer/LayerPage.vue";
import DataPage from "../data/DataPage.vue";
</script>

<template>
    <n-scrollbar>
        <n-tabs justify-content="space-evenly" type="card" style="padding: 5px;" animated>
            <n-tab-pane name="layer" tab="图层">
                <LayerPage/>
            </n-tab-pane>
            <n-tab-pane name="data" tab="数据管理">
                <DataPage/>
            </n-tab-pane>
        </n-tabs>
    </n-scrollbar>
</template>

<style scoped>
</style>
