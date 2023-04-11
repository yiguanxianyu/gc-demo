<template>
    <div>
        <n-grid :cols="4" :rows="2" x-gap="12">
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="影像数量">
                    <template #prefix>
                        <n-icon :component="FileImage"/>
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="矢量数量">
                    <template #prefix>
                        <n-icon :component="VectorSquare"/>
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="工具数量">
                    <template #prefix>
                        <n-icon :component="Tools"/>
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="'是'" class="stat-label" label="运算中">
                    <template #prefix>
                        <n-icon :component="Desktop"/>
                    </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="CPU占用">
                    <template #prefix>
                        <n-icon :component="HardwareChip"/>
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="GPU占用">
                    <template #prefix>
                        <n-icon :component="HardwareChip"/>
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="内存占用">
                    <template #prefix>
                        <n-icon :component="Memory"/>
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="23" class="stat-label" label="硬盘占用">
                    <template #prefix>
                        <n-icon :component="Archive"/>
                    </template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
        </n-grid>
    </div>
</template>

<script setup>
import {NGi, NGrid, NIcon, NStatistic} from "naive-ui";
import {HardwareChip} from "@vicons/ionicons5";
import {Archive, Desktop, FileImage, Memory, Tools, VectorSquare} from "@vicons/fa";
</script>

<style lang="scss" scoped>
.stat-label {
  padding: 5px;
}
</style>