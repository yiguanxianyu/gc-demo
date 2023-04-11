<script setup>
import Map from "./components/map/MapViewOL.vue";
import LeftSideBar from "./components/sidebar_left/LeftSideBar.vue";
import RightSideBar from "./components/sidebar_right/RightSideBar.vue";
import { NConfigProvider, darkTheme, NMessageProvider, NDialogProvider } from "naive-ui";

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */


</script>

<template>
    <n-dialog-provider>
        <n-message-provider>
            <n-config-provider inline-theme-disabled :theme="darkTheme">
                <div id="container">
                    <LeftSideBar />
                    <Map style="width: 100%;height: 100%;" />
                    <RightSideBar />
                </div>
            </n-config-provider>
        </n-message-provider>
    </n-dialog-provider>
</template>


<style scoped>
#container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
}
</style>
