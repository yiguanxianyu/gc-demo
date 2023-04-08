<script setup>
import { NLayoutContent, NInput } from "naive-ui";

/**
 * @typedef {Object} arg
 * @property {string} description
 * @property {string} inputType
 * @property {Boolean} optional
 */


defineProps({
    arg: Object
});


</script>
<template>
    <n-layout-content content-style="padding: 4px;">
        <p>{{ arg.description }} {{ arg.optional ? '(可选)' : '' }}</p>
        <n-input v-if="arg.inputType === 'common'" placeholder="请输入字符串" />
        <n-input v-if="arg.inputType === 'vector'" placeholder="请输入矢量" />
        <n-input v-if="arg.inputType === 'raster'" placeholder="请输入栅格" />
    </n-layout-content>
</template>

