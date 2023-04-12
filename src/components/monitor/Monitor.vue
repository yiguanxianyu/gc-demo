<script setup>
import { onMounted } from "vue";
import { NGi, NGrid, NIcon, NStatistic } from "naive-ui";
import { HardwareChip } from "@vicons/ionicons5";
import { Archive, Desktop, FileImage, Memory, Tools, VectorSquare } from "@vicons/fa";
import { useMonitorStore } from "@/store/monitor.js";
import { storeToRefs } from 'pinia';
const store = useMonitorStore();
const { numImages, numVectors, numAlgorithms, cpuUsage, gpuUsage, memoryUsage, diskUsage, gpuMemoryUsage } = storeToRefs(store);
onMounted(() => {
    store.autoUpdate();
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