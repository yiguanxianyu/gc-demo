<script setup>
import {NDropdown, NTree, useDialog, useMessage} from "naive-ui";
import {onBeforeMount, ref} from "vue";
import {useUsersStore} from "@/store/user.js";
import {storeToRefs} from 'pinia';

const message = useMessage();
const dialog = useDialog();
const store = useUsersStore();

const { data: dataItems, pattern } = storeToRefs(store);

const xRef = ref(0);
const yRef = ref(0);
const showDropdown = ref(false);
const options = ref([]);

onBeforeMount(() => {
    store.fetchDirFromServer();
})

const previewFile = () => {
    message.error("该功能尚未实现");
}

const addToLayer = () => {
    //Check if layer exists
    if (store.checkLayerExists(store.selectedItem.path)) {
        message.error("已存在的图层不能重复添加");
        return;
    }
    store.addLayer(store.selectedItem.path);
    //TODO: add to ol layer
}

const renamePath = () => {
    const newLabel = window.prompt("请输入新的名称", store.selectedItem.label);
    if (newLabel === null) return;
    store.renamePath(store.selectedItem.path, newLabel);
}

const removePath = () => {
    console.log(store.selectedItem);
    const removeType = store.selectedItem.children ? "文件夹" : "文件";
    dialog.warning({
        title: `${removeType}删除警告`,
        content: `是否从服务器端永久删除该${removeType}？请注意，此过程是不可逆的！`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            store.removePath(store.selectedItem.path);
            //TODO: delete from leaflet layer and server
            message.error("服务器端删除功能尚未实现");
        }
    })
}

const downloadFile = () => {
    message.error("该功能尚未实现");
}

const selectedKeyChanged = (keys, option, meta) => {
    switch (meta.action) {
        case 'select':
            store.selectedItem = meta.node;
            break;
        case 'unselect':
            store.selectedItem = null;
            break;
    }
}

const nodeProps = ({ option }) => {
    return {
        oncontextmenu: (e) => {
            store.selectedItem = option;
            if (option.children) {
                options.value = [{
                    label: "目录：" + option.label,
                    key: 'selected-folder',
                    disabled: true
                }, {
                    label: '重命名',
                    key: 'rename-path'
                }, {
                    label: '删除',
                    key: 'remove-path'
                }, {
                    label: '下载',
                    key: 'download-dir'
                }]
            } else {
                options.value = [{
                    label: "文件：" + option.label,
                    key: 'selected-file',
                    disabled: true
                }, {
                    label: '预览',
                    key: 'preview-file'
                }, {
                    label: '添加到图层',
                    key: 'add-to-layer'
                }, {
                    label: '重命名',
                    key: 'rename-path'
                }, {
                    label: '删除',
                    key: 'remove-path'
                }, {
                    label: '下载',
                    key: 'download-file'
                }]
            }

            xRef.value = e.clientX;
            yRef.value = e.clientY;
            showDropdown.value = true;
            e.preventDefault();
        }
    }
}

const handleSelect = (option) => {
    switch (option) {
        case 'add-to-layer':
            addToLayer();
            break;
        case 'preview-file':
            previewFile();
            break;
        case 'rename-path':
            store.renamePath();
            break;
        case 'remove-path':
            removePath();
            break;
        case 'download-file':
            downloadFile();
            break;
        case 'remove-dir':
            removeFile();
            break;
        case 'download-dir':
            downloadFile();
            break;
        default:
            console.log("Unknown option");
            break;
    }
    showDropdown.value = false;
}
</script>

<template>
    <div id="container">
        <n-tree class="tree" key-field="path" expand-on-click selectable @update:selected-keys="selectedKeyChanged"
            :data="dataItems" :show-irrelevant-nodes="false" :pattern="pattern" :node-props="nodeProps" />
        <n-dropdown trigger="manual" placement="bottom" :show="showDropdown" :options="options" :x="xRef" :y="yRef"
            @select="handleSelect" @clickoutside="showDropdown = false" />

    </div>
</template>

<style scoped lang="scss">
.button {
    padding: 5px;
}

:deep(.n-tree-node-indent) {
    content: "";
    display: block;
    width: 4px;
}
</style>