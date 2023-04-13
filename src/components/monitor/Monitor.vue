<script setup>
import { onMounted, ref } from "vue";
import { NGi, NGrid, NIcon, NStatistic } from "naive-ui";
import { HardwareChip } from "@vicons/ionicons5";
import { Archive, FileImage, Memory, Tools, VectorSquare } from "@vicons/fa";
import axios from "axios";

const numImages = ref(0);
const numVectors = ref(0);
const numAlgorithms = ref(0);
const cpuUsage = ref(0);
const gpuUsage = ref(0);
const memoryUsage = ref(0);
const diskUsage = ref(0);
const gpuMemoryUsage = ref(0);

onMounted(() => {
    setInterval(() => {
        axios.get(import.meta.env.VITE_BACKEND_POST_API + "/get/monitor").then(res => {
            numImages.value = res.data.numImages;
            numVectors.value = res.data.numVectors;
            numAlgorithms.value = res.data.numAlgorithms;
            cpuUsage.value = res.data.cpuUsage;
            memoryUsage.value = res.data.memoryUsage;
            gpuUsage.value = res.data.gpuUsage;
            gpuMemoryUsage.value = res.data.gpuMemoryUsage;
            diskUsage.value = res.data.diskUsage;
        })
    }, import.meta.env.VITE_MONITOR_UPDATE_INTERVAL);
});
</script>

<template>
    <div>
        <n-grid :cols="4" :rows="2" x-gap="12">
            <n-gi>
                <n-statistic :value="numImages" class="stat-label" label="影像数量">
                    <template #prefix>
                        <n-icon :component="FileImage" />
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="numVectors" class="stat-label" label="矢量数量">
                    <template #prefix>
                        <n-icon :component="VectorSquare" />
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="numAlgorithms" class="stat-label" label="工具数量">
                    <template #prefix>
                        <n-icon :component="Tools" />
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="diskUsage" class="stat-label" label="硬盘占用">
                    <template #prefix>
                        <n-icon :component="Archive" />
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="cpuUsage" class="stat-label" label="CPU占用">
                    <template #prefix>
                        <n-icon :component="HardwareChip" />
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>

                <n-statistic :value="memoryUsage" class="stat-label" label="内存占用">
                    <template #prefix>
                        <n-icon :component="Memory" />
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="gpuUsage" class="stat-label" label="GPU占用">
                    <template #prefix>
                        <n-icon :component="HardwareChip" />
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="gpuMemoryUsage" class="stat-label" label="显存占用">
                    <template #prefix>
                        <n-icon :component="Memory" />
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
        </n-grid>
    </div>
</template>



<style lang="scss" scoped>
.stat-label {
    padding: 5px;
}
</style>