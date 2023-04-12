<script setup>
import {NCard, NIcon} from "naive-ui";
import {GlobeAsia} from "@vicons/fa";
import {onMounted, ref} from "vue";

let rotatedAngle = ref(0);

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
        <n-card content-style="font-size: 25px;text-align: center;line-height:100px;margin:0;padding:0;" size="huge"
                style="position: relative;">
            <n-icon :component="GlobeAsia" :style="`vertical-align: middle;transform: rotate(${rotatedAngle}deg)`"
                    size="70px"/>
            地理引擎计算系统
        </n-card>
        <div class="version">v0.2-alpha by yiguanxianyu</div>
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