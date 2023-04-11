<script setup>
import {NCard, NIcon, NMenu, NScrollbar, useMessage} from 'naive-ui'
import {useUsersStore} from "@/store/user.js";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "vue";
import AlgoSetup from "./AlgoSetupCard.vue";
import {Toolbox} from "@vicons/fa";

const message = useMessage();
const store = useUsersStore();
const {algorithms: menuOptions} = storeToRefs(store)

const currAlgoInfo = ref({})
const showModal = ref(false)

const menuValueUpdate = (key, item) => {
    if (!key.startsWith("menu-")) {
        currAlgoInfo.value = item;
        showModal.value = true;
    }
}

const beforeUpload = (file) => {
    message.error("此功能暂未实现");
    return false;
}

const switchColorMode = () => {
    message.error("此功能暂未实现");
}

const userExit = () => {
    message.error("此功能暂未实现");
}

onBeforeMount(() => {
    store.fetchAlgorithmsFromServer();
})
</script>

<template>
    <div class="container">

        <n-card :bordered="false" content-style="font-size:20px;text-align:
        center;line-height:40px;margin:0;padding:0;background-color=rgba(0,0,0,0)" size="small"
                style="position: relative;background-color:rgba(0,0,0,0)">
            <n-icon :component="Toolbox" style="vertical-align: middle"/>
            工具箱
        </n-card>

        <n-scrollbar style="border:1px solid #dddddd;border-radius: 5px;">
            <n-menu :indent="18" :options="menuOptions" :root-indent="12" default-expand-all
                    @update-value="menuValueUpdate"/>
        </n-scrollbar>

        <!-- <div id="button_group">
            <n-button @click="switchColorMode">深色模式</n-button>
            <n-upload :max="1" accept=".gpx" @before-upload="beforeUpload">
                <n-button>上传文件</n-button>
            </n-upload>
            <n-button @click="userExit">退出</n-button>
        </div> -->

        <AlgoSetup v-model:visible="showModal" :algo-info="currAlgoInfo"/>

    </div>
</template>

<style scoped>
.container {
    width: 400px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    text-align: left;
}

#button_group {
    display: flex;
    justify-content: space-between;
}
</style>
