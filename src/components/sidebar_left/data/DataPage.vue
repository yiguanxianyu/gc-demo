<script setup>
import DataItem from "./DataPageItem.vue";
import {NList, NCard, NButton, NSpace, useMessage, useDialog} from "naive-ui";
import {ref} from "vue";
import {useUsersStore} from "@/store/user";
import {storeToRefs} from 'pinia';

const message = useMessage();
const dialog = useDialog();
const store = useUsersStore();
const {exampleData: dataItems, layers: layerItems} = storeToRefs(store)
const selectedItemId = ref(-1);

const itemClicked = (itemId) => {
    console.log(itemId, selectedItemId.value)
    if (itemId === selectedItemId.value) {
        selectedItemId.value = -1;
    } else {
        selectedItemId.value = itemId;
    }
}
const warningFileNotChosenDecorator = (fn) => {
    return () => {
        if (selectedItemId.value === -1) {
            message.error("请先选择文件");
            return;
        }
        fn();
    }
}
const previewFile = warningFileNotChosenDecorator(() => {
    console.log("preview" + selectedItemId.value)
})
const addToLayer = warningFileNotChosenDecorator(() => {
    //Check layer exists
    if (layerItems.value.find(item => item.uuid === selectedItemId.value)) {
        message.error("已存在的图层不能重复添加");
        return;
    }

    const itemToAdd = dataItems.value.find(item => item.uuid === selectedItemId.value)
    layerItems.value.push({
        uuid: itemToAdd.uuid,
        title: itemToAdd.title,
        type: itemToAdd.type,
        checked: true
    })

    //TODO: add to leaflet layer
})

const renameFile = warningFileNotChosenDecorator(() => {
    let layerItemToUpdate = layerItems.value.find(item => item.uuid === selectedItemId.value);
    let dataItemToUpdate = dataItems.value.find(item => item.uuid === selectedItemId.value);

    const newTitle = window.prompt("请输入新的名称", dataItemToUpdate.title);

    dataItemToUpdate.title = newTitle;

    if (layerItemToUpdate) {
        layerItemToUpdate.title = newTitle;
    }
})

const deleteFile = warningFileNotChosenDecorator(() => {
    dialog.warning({
        title: '文件删除警告',
        content: '是否从服务器端永久删除该文件？请注意，此过程是不可逆的！',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            if (layerItems.value.find(item => item.uuid === selectedItemId.value)) {
                layerItems.value = layerItems.value.filter(item => item.uuid !== selectedItemId.value);
            }

            dataItems.value = dataItems.value.filter(item => item.uuid !== selectedItemId.value);

            //TODO: delete from leaflet layer and server
            message.error("服务器端删除功能尚未实现");
        }
    })
})

const downloadFile = warningFileNotChosenDecorator(() => {
    message.error("该功能尚未实现");
})
</script>

<template>
    <n-list hoverable clickable>
        <n-card content-style="padding: 5px;margin: 5px 10px 5px 10px" size="small">
            <n-space justify="center">
                <n-button class="button" size="small" @click="previewFile">预览</n-button>
                <n-button class="button" size="small" @click="addToLayer">添加到图层</n-button>
                <n-button class="button" size="small" @click="renameFile">重命名</n-button>
                <n-button class="button" size="small" @click="deleteFile">删除</n-button>
                <n-button class="button" size="small" @click="downloadFile">下载</n-button>
            </n-space>
        </n-card>
        <DataItem v-for="item in dataItems" :style="item.uuid === selectedItemId ? 'background-color: #4ccf50' : ''"
                  :title="item.title" :type="item.type" @click="itemClicked(item.uuid)"/>
    </n-list>
</template>

<style scoped>
.button {
    padding: 5px;
}
</style>