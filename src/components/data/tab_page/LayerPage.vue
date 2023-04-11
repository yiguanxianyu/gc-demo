<template>
    <div id="container">
        <n-tree id="tree" key-field="path" checkable :data="layerItems" :show-irrelevant-nodes="false" :pattern="pattern"
            :node-props="nodeProps"  />

        <n-dropdown trigger="manual" placement="bottom" :show="showDropdown" :options="options" :x="xRef" :y="yRef"
            @select="handleSelect" @clickoutside="showDropdown = false" />

    </div>
</template>

<script setup>
import { NDropdown, NTree, NIcon, useMessage } from "naive-ui";
import { ref } from "vue";
import { useUsersStore } from "@/store/user.js";
import { storeToRefs } from 'pinia';


const message = useMessage();
const store = useUsersStore();
const { layers: layerItems, pattern } = storeToRefs(store)
const selectedLayerPath = ref(null);

const xRef = ref(0);
const yRef = ref(0);
const showDropdown = ref(false);
const options = ref([])


const itemClicked = (itemId) => {
    if (itemId === selectedLayerPath.value) {
        selectedLayerPath.value = null;
    } else {
        selectedLayerPath.value = itemId;
    }
}

const moveUp = () => {
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
}

const moveDown = () => {
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
}

const removeLayer = () => {
    layerItems.value = layerItems.value.filter(item => item.path !== selectedLayerPath.value);
    selectedLayerPath.value = null;

    //TODO: remove from leaflet layer
}

const updateLayerName = () => {
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
}

const toggleDisplay = () => {
    for (let i = 0; i < layerItems.value.length; i++) {
        if (layerItems.value[i].path === selectedLayerPath.value) {
            layerItems.value[i].checked = !layerItems.value[i].checked
            //TODO: toggle display
            break
        }
    }
}

const downloadLayer = () => {
    message.error("该功能尚未实现");
    //TODO: download
}

const locateLayer = () => {
    message.error("该功能尚未实现");
    //TODO: locate layer
}

const nodeProps = ({ option }) => {
    return {
        oncontextmenu: (e) => {
            store.selectedItem = option;
            options.value = [{
                label: "文件：" + option.label,
                key: 'selected-file',
                disabled: true
            }, {
                label: '向上移动图层',
                key: 'move-up'
            }, {
                label: '向下移动图层',
                key: 'move-down'
            }, {
                label: '切换显示',
                key: 'toggle-display'
            }, {
                label: '定位',
                key: 'locate-layer'
            }, {
                label: '重命名',
                key: 'rename-path'
            }, {
                label: '下载',
                key: 'download-file'
            }, {
                label: '删除',
                key: 'remove-layer'
            }]

            xRef.value = e.clientX;
            yRef.value = e.clientY;
            showDropdown.value = true;
            e.preventDefault();
        }
    }
}


const handleSelect = (option) => {
    switch (option) {
        case 'move-up':
            downloadFile();
            break;
        case 'move-down':
            removeFile();
            break;
        case 'toggle-display':
            toggleDisplay();
            break;
        case 'locate-layer':
            locateLayer();
            break;
        case 'rename-path':
            store.renamePath();
            break;
        case 'download-path':
            removeFile();
            break;
        case 'remove-layer':
            downloadFile();
            break;
    }
    console.log(option);
    showDropdown.value = false;
}
</script>



<style scoped></style>
<!-- 
<n-space justify="center">
                <n-button class="button" size="tiny" @click="moveDown">↓</n-button>
                <n-button class="button" size="tiny" @click="moveUp">↑</n-button>
                <n-button class="button" size="tiny" @click="toggleDisplay">切换显示</n-button>
                <n-button class="button" size="tiny" @click="updateLayerName">重命名</n-button>
                <n-button class="button" size="tiny" @click="removeLayer">删除</n-button>
                <n-button class="button" size="tiny" @click="downloadLayer">下载</n-button>
                <n-button class="button" size="tiny" @click="locateLayer">定位</n-button>
            </n-space> -->