<template>
    <n-space vertical size="large">
        <n-layout has-sider>

            <n-layout-sider width="50"
                content-style="display:flex;flex-direction: column;justify-content:center;align-items:center">
                <n-avatar size="large" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </n-layout-sider>

            <n-layout>
                <n-layout-content content-style="padding:10px">
                    黄色潜水艇
                </n-layout-content>
            </n-layout>

        </n-layout>
    </n-space>
</template>

<script setup>
import {
    NSpace,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NAvatar,
    NButton,
} from 'naive-ui'
</script>

<style scoped>
.n-layout-header {
    background: rgba(128, 128, 128, 0.1);
}

.n-layout-sider {
    background: rgba(128, 128, 128, 0.3);
}
</style>
