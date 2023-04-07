<template>
    <div class="container">
        <p id="title">工具箱</p>
        <n-scrollbar style="border:1px solid #dddddd;border-radius: 5px;">
        <n-menu
            :root-indent="12"
            :indent="18"
            :options="menuOptions"
            :default-expanded-keys="defaultExpandedKeys"
            @update:expanded-keys="handleUpdateExpandedKeys"
        />
        </n-scrollbar>
        <div>
            <n-button color="#7fdd09">深色模式</n-button>
            <n-button color="#a90d19">上传数据</n-button>
        </div>
    </div>
</template>

<script setup>
import { NCard, NButton,NMenu,NScrollbar} from 'naive-ui'

const menuOptions = [
    {
        label: "数据管理",
        key: "data-management",
        children: [
            {
                label: "数据上传",
                key: "data-upload",
            },
            {
                label: "数据下载",
                key: "data-download",
            },
        ]
    },
    {
        label: "基础分析",
        key: "basic-analysis",
        children: [
            {
                label: "NDVI计算",
                key: "ndvi-calculation",
            },
        ]
    }
];
let defaultExpandedKeys= ["data-management", "basic-analysis"];
let handleUpdateExpandedKeys=(keys) =>{
    console.log(keys);
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    text-align: left;

}

#title {
    padding-left: 10px;
    font-size: 1.2em;
    font-weight: bold;
}
</style>
