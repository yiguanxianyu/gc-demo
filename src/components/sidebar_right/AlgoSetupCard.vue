<script setup>
/**
 * @typedef {Object} algoInfo
 * @property {string} label
 * @property {string} key
 * @property {string} text
 * @property {array} arguments
 */

import {
    NButton, NModal, NCard, NLayout,
    NLayoutSider, useMessage
} from "naive-ui";
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/store/user.js";
import ArgInputItem from "@/components/sidebar_right/ArgInputItem.vue";
import ArgForm from "@/components/sidebar_right/ArgForm.vue";

const message = useMessage();
const store = useUsersStore();
const { algorithms: menuOptions } = storeToRefs(store)

defineProps({
    visible: Boolean,
    algoInfo: Object
});
const emit = defineEmits(['update:visible']);

const closeModal = () => {
    emit('update:visible', false);
}
const userConfirmed = () => {
    //TODO: send compute request
    message.error("此功能暂未实现");
    closeModal();
}

const userCanceled = () => {
    closeModal();
}
</script>

<template>
    <n-modal :show="visible" :mask-closable="false" @update:show="closeModal">
        <n-card style="width:600px" :title="algoInfo.label" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                <n-button type="primary" @click="userCanceled" style="margin: 5px">取消</n-button>
                <n-button type="primary" @click="userConfirmed">执行</n-button>
            </template>

            <div id="container">
                <n-card id="algo_text">{{ algoInfo.text }}</n-card>
                <ArgForm v-model:arg-array="algoInfo.arguments" />
            </div>


        </n-card>

    </n-modal>
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#algo_text {
    width: 40vw;
    height: 60vh;
    margin: 0 15px 0 0;
    overflow: auto;
}
</style>