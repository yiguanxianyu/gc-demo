<script setup>
import LayerItem from "./LayerPageItem.vue";
import { NButton, NCard, NList, NSpace, useMessage } from "naive-ui";
import { ref } from "vue";
import { useUsersStore } from "@/store/user";
import { storeToRefs } from 'pinia';

const message = useMessage();
const store = useUsersStore();
const { layers: layerItems } = storeToRefs(store)
const selectedLayerPath = ref(null);

const itemClicked = (itemId) => {
    if (itemId === selectedLayerPath.value) {
        selectedLayerPath.value = null;
    } else {
        selectedLayerPath.value = itemId;
    }
}

const warningLayerNotChosenDecorator = (fn) => {
    return () => {
        if (!selectedLayerPath.value) {
            message.error("请先选择图层");
            return;
        }
        fn();
    }
}

const moveUp = warningLayerNotChosenDecorator(() => {
    if (layerItems.value[0].path === selectedLayerPath.value) {
        message.error("已经是最上面了");
        return;
    }

    for (let i = 0; i < layerItems.value.length; i++) {
        if (layerItems.value[i].path === selectedLayerPath.value) {
            [layerItems.value[i], layerItems.value[i - 1]] = [layerItems.value[i - 1], layerItems.value[i]];
            //TODO: move up in leaflet layer
            break;
        }
    }
})

const moveDown = warningLayerNotChosenDecorator(() => {
    if (layerItems.value[layerItems.value.length - 1].path === selectedLayerPath.value) {
        message.error("已经是最下面了");
        return;
    }

    for (let i = 0; i < layerItems.value.length; i++) {
        if (layerItems.value[i].path === selectedLayerPath.value) {
            [layerItems.value[i], layerItems.value[i + 1]] = [layerItems.value[i + 1], layerItems.value[i]];
            //TODO: move down in leaflet layer
            break;
        }
    }
})

const removeLayer = warningLayerNotChosenDecorator(() => {
    layerItems.value = layerItems.value.filter(item => item.path !== selectedLayerPath.value);
    selectedLayerPath.value = null;

    //TODO: remove from leaflet layer
})

const updateLayerName = warningLayerNotChosenDecorator(() => {
    const itemToUpdate = layerItems.value.find(item => item.path === selectedLayerPath.value);
    const newLabel = window.prompt("请输入新的名称", itemToUpdate.label);
    if (newLabel === null) {
        return;
    }
    store.updateName(selectedLayerPath.value, newLabel);
    // let layerItemToUpdate = layerItems.value.find(item => item.path === selectedLayerPath.value);
    // let dataItemToUpdate = dataItems.value.find(item => item.path === selectedLayerPath.value);
    // dataItemToUpdate.title = newTitle;
    // layerItemToUpdate.title = newTitle;
})

const toggleDisplay = warningLayerNotChosenDecorator(() => {
    for (let i = 0; i < layerItems.value.length; i++) {
        if (layerItems.value[i].path === selectedLayerPath.value) {
            layerItems.value[i].checked = !layerItems.value[i].checked
            //TODO: toggle display
            break
        }
    }
})

const downloadLayer = warningLayerNotChosenDecorator(() => {
    message.error("该功能尚未实现");
    //TODO: download
})

const locateLayer = warningLayerNotChosenDecorator(() => {
    message.error("该功能尚未实现");
    //TODO: locate layer
})

const getLayerItemStyle = (item) => {
    const bgColor = item.path === selectedLayerPath.value ? 'background-color: #4ccf50' : '';
    const wordBreak = ';word-break: break-all'
    return bgColor + wordBreak;
}
</script>

<template>
    <n-list hoverable clickable>
        <n-card content-style="padding: 5px;margin: 5px 10px 5px 10px" size="small">
            <n-space justify="center">
                <n-button class="button" size="tiny" @click="moveDown">↓</n-button>
                <n-button class="button" size="tiny" @click="moveUp">↑</n-button>
                <n-button class="button" size="tiny" @click="toggleDisplay">切换显示</n-button>
                <n-button class="button" size="tiny" @click="updateLayerName">重命名</n-button>
                <n-button class="button" size="tiny" @click="removeLayer">删除</n-button>
                <n-button class="button" size="tiny" @click="downloadLayer">下载</n-button>
                <n-button class="button" size="tiny" @click="locateLayer">定位</n-button>
            </n-space>

        </n-card>
        <div style="overflow: auto">
            <LayerItem v-for="item in layerItems" :style="getLayerItemStyle(item)" :label="item.label"
                :checked="item.checked" @click="itemClicked(item.path)" />
        </div>
    </n-list>
</template>

<style scoped></style>