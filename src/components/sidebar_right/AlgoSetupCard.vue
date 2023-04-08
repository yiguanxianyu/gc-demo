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
import {storeToRefs} from "pinia";
import {useUsersStore} from "@/store/user.js";
import ArgInputItem from "@/components/sidebar_right/ArgInputItem.vue";
import ArgForm from "@/components/sidebar_right/ArgForm.vue";

const message = useMessage();
const store = useUsersStore();
const {algorithms: menuOptions} = storeToRefs(store)

defineProps({
    visible: Boolean,
    algoInfo: Object
});
defineEmits(['update:visible']);

const sendComputeRequest = () => {
    //TODO: send compute request
    message.error("此功能暂未实现");
}
</script>

<template>
    <n-modal :show="visible"
             :mask-closable="false"
             @update:show="$emit('update:visible', false)"
    >
        <n-card style="width: 600px"
                :title="algoInfo.label"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
        >

            <n-layout has-sider>
                <n-layout-sider id="sider" bordered content-style="padding: 6px;" width="200px">
                    {{ algoInfo.text }}
                </n-layout-sider>
                <n-layout>
                    <ArgForm />
                    <!--                    <ArgInputItem v-for="inputItem in algoInfo.arguments" :arg="inputItem"/>-->

                    <n-button @click="$emit('update:visible', false)">关闭</n-button>
                    <n-button @click="sendComputeRequest();$emit('update:visible', false)" type="primary">提交
                    </n-button>
                </n-layout>
            </n-layout>

        </n-card>

    </n-modal>
</template>

<style scoped>
#sider {
    background: rgba(128, 128, 128, 0.1);
}

</style>