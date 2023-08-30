<script setup>
import { NCard, NIcon } from "naive-ui";
import { GlobeAsia } from "@vicons/fa";
import { onMounted, ref } from "vue";

let rotatedAngle = ref(0);

const version = ref(import.meta.env.VITE_VERSION)

onMounted(() => {
    getStyle();
});

const getStyle = () => {
    setInterval(() => {
        rotatedAngle.value += 0.2;
    }, 20);
};
</script>

<template>
    <div>
        <n-card content-style="font-size: 26px;text-align: center;line-height:100px;margin:0;padding:0" size="huge"
            style="position: relative;">
            <n-icon :component="GlobeAsia" :style="`vertical-align: middle;transform: rotate(${rotatedAngle}deg)`"
                size="70px" />
          地理计算引擎系统
        </n-card>
        <div class="version">{{ version }} by yiguanxianyu</div>
    </div>
</template>


<style scoped>
.version {
    position: absolute;
    color: rgba(255, 255, 255, 0.82);
    bottom: 5px;
    right: 10px;
}
</style>