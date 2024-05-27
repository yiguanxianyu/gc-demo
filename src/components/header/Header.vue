<script setup>
import { NCard, NIcon } from "naive-ui";
import { GlobeAsia } from "@vicons/fa";
import { onMounted, ref } from "vue";

let rotatedAngle = ref(0);

onMounted(() => {
    rotate();
});

const rotate = () => {
    setInterval(() => {
        rotatedAngle.value += 0.2;
    }, 20);
};
</script>

<template>
    <div>
        <n-card class="panel-card" content-style="text-align: center;margin:0;padding:0" size="huge">
            <div class="container">
                <div class="left">
                    <n-icon :component="GlobeAsia" :style="`vertical-align: middle;transform: rotate(${rotatedAngle}deg)`"
                        size="70px" />
                </div>
                <div class="right">
                    <div class="title">新疆陆表关键要素<br>遥感动态监测系统</div>
                </div>
            </div>
        </n-card>
    </div>
</template>


<style scoped>
.panel-card {
    position: relative;
    height: 100%;
}

.container {
    display: flex;
    height: 100%;
}

.left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #cccccc7c;
}

.right {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 22px;
    text-align: center;
}
</style>