<script setup>
import { NButton, NListItem, NSpace } from 'naive-ui'
import { defineProps, ref } from 'vue'

defineProps({
    title: String,
    type: String
})

const getType = (type) => {
    switch (type) {
        case "raster":
            return "栅格文件";
        case "vector":
            return "矢量文件";
        default:
            return "未知文件";
    }
}

</script>

<template>
    <n-list-item id="container">
        <div id="title">
            <span>{{ title }} </span>
            <span style="font-size: 0.8em;color: #0078a8">{{ getType(type) }}</span>
        </div>
    </n-list-item>
</template>

<style scoped>
#container {
    text-align: left;
    padding: 5px;
}

#title {
    padding: 2px;
    margin: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center
}
</style>
