<script setup>
/**
 * @typedef {Object} algoInfo
 * @property {string} label
 * @property {string} key
 * @property {string} text
 * @property {array} arguments
 */

import {NButton, NCard, NModal, useMessage} from "naive-ui";
import {storeToRefs} from "pinia";
import {useUsersStore} from "@/store/user.js";
import ArgForm from "@/components/toolbox/ArgForm.vue";

const message = useMessage();
const store = useUsersStore();
const {algorithms: menuOptions} = storeToRefs(store)

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
    <n-modal :mask-closable="false" :show="visible" @update:show="closeModal">
        <n-card :bordered="false" :title="algoInfo.label" aria-modal="true" role="dialog" size="huge"
                style="width:800px">
            <template #header-extra>
                <n-button style="margin: 5px" type="primary" @click="userCanceled">取消</n-button>
                <n-button type="primary" @click="userConfirmed">执行</n-button>
            </template>

            <div id="container">
                <n-card id="algo_text" style="white-space: pre-line">{{ algoInfo.text }}</n-card>
                <ArgForm v-model:arg-array="algoInfo.arguments" style="width: 250px"/>
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