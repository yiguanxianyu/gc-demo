<script setup>
/**
 * @typedef {Object} algoInfo
 * @property {string} label
 * @property {string} key
 * @property {string} text
 * @property {array} arguments
 */

import { NButton, NCard, NModal, useMessage } from "naive-ui";
import ArgForm from "@/components/toolbox/ArgForm.vue";
import axios from "axios";
import { useUsersStore } from "@/store/user.js";
const message = useMessage();

const store = useUsersStore();

const props = defineProps({
    visible: Boolean,
    algoInfo: Object
});

const emit = defineEmits(['update:visible']);

const closeModal = () => {
    emit('update:visible', false);
}
const userConfirmed = () => {
    const algo = props.algoInfo;
    let params = [];
    for (let i = 0; i < algo.arguments.length; i++) {
        const arg = algo.arguments[i];
        if (arg.argType === 'output-raster' || arg.argType === 'output-vector') {
            arg.value = arg.dir + '/' + arg.fileName;
        }
        params.push(arg.value);
    }
    axios.post(import.meta.env.VITE_BACKEND_POST_API, {
        "request-type": 'run-algo',
        "algo-key": algo.key,
        "params": params
    }).then(res => {
        message.success('计算成功' + res.data.message);
        store.addLayer({
            label: res.data.label,
            path: res.data.path,
        })
    }).catch(err => {
        message.error('计算失败');
    });
    closeModal();
}

const userCanceled = () => {
    closeModal();
}
</script>

<template>
    <n-modal :mask-closable="false" :show="visible" @update:show="closeModal">
        <n-card :title="algoInfo.label" aria-modal="true" role="dialog" size="huge" style="width:800px">
            <template #header-extra>
                <n-button style="margin: 5px" type="primary" @click="userCanceled">取消</n-button>
                <n-button type="primary" @click="userConfirmed">执行</n-button>
            </template>

            <div id="container">
                <n-card id="algo_text" style="">{{ algoInfo.text }}</n-card>
                <ArgForm v-model:arg-array="algoInfo.arguments" style="width: 250px" />
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
    white-space: pre-line;
    max-width: 400px;
    margin: 0 15px 0 0;
    overflow: auto;
}
</style>