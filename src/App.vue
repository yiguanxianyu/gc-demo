<script setup>
import Map from "./components/map/MapView.vue";
import LeftSideBar from "./components/sidebar_left/LeftSideBar.vue";
import RightSideBar from "./components/sidebar_right/RightSideBar.vue";
import {NMessageProvider, NDialogProvider} from "naive-ui";
</script>

<template>
    <n-dialog-provider>
        <n-message-provider>
            <div id="container">
                <LeftSideBar style="width: 400px"/>
                <Map style="width: 100%;height: 100%;"/>
                <RightSideBar style="width: 400px"/>
            </div>
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
