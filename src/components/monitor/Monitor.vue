<template>
    <div>
        <n-grid x-gap="12" :cols="4" :rows="2">
            <n-gi>
                <n-statistic label="影像数量" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="FileImage" /></template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="矢量数量" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="VectorSquare" /></template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="工具数量" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="Tools" /></template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="运算中" :value="'是'" class="stat-label">
                    <template #prefix><n-icon :component="Desktop" /></template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="CPU占用" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="HardwareChip" /></template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="GPU占用" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="HardwareChip" /></template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="内存占用" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="Memory" /></template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi><n-gi>
                <n-statistic label="硬盘占用" :value="23" class="stat-label">
                    <template #prefix><n-icon :component="Archive" /></template>
                    <template #suffix>%</template>
                </n-statistic>
            </n-gi>
        </n-grid>
    </div>
</template>

<script setup>
import { NStatistic, NIcon, NGi, NGrid } from "naive-ui";
import { HardwareChip } from "@vicons/ionicons5";
import { Memory, Desktop, Tools, Archive, FileImage, VectorSquare } from "@vicons/fa";
</script>

<style scoped lang="scss">
.stat-label {
    padding: 5px;
}
</style>