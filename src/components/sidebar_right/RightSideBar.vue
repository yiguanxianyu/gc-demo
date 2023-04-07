<script setup>
import {NButton, NMenu, NScrollbar} from 'naive-ui'
import {useUsersStore} from "@/store/user.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import AlgoSetup from "./AlgoSetup.vue";

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
</script>

<template>
    <div class="container">
        <p id="title">工具箱</p>
        <n-scrollbar style="border:1px solid #dddddd;border-radius: 5px;">
            <n-menu default-expand-all
                    :root-indent="12"
                    :indent="18"
                    :options="menuOptions"
                    @update-value="menuValueUpdate"/>
        </n-scrollbar>
        <div>
            <n-button color="#7fdd09" @click="showModal=true">深色模式</n-button>
            <n-button color="#a90d19">上传数据</n-button>
        </div>

        <AlgoSetup v-model:visible="showModal" :algo-info="currAlgoInfo"/>
    </div>

</template>

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
