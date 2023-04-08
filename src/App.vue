<script setup>
import Map from "./components/map/MapView.vue";
import LeftSideBar from "./components/sidebar_left/LeftSideBar.vue";
import RightSideBar from "./components/sidebar_right/RightSideBar.vue";
import { NConfigProvider, darkTheme, NMessageProvider, NDialogProvider } from "naive-ui";

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */


</script>

<template>
    <n-config-provider>
        <n-dialog-provider>
            <n-message-provider>
                <div id="container">
                    <LeftSideBar style="width: 400px" />
                    <Map style="width: 100%;height: 100%;" />
                    <RightSideBar style="width: 400px" />
                </div>
            </n-message-provider>
        </n-dialog-provider>
    </n-config-provider>
</template>


<style scoped>
#container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
}
</style>
