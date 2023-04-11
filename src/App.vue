<template>
    <n-dialog-provider>
        <n-message-provider>
            <n-config-provider inline-theme-disabled :theme="darkTheme" :theme-overrides="themeOverrides">
                <div id="app">
                    <MapView id="map" />
                    <Header id="title-card" />
                    <LeftSideBar id="floating-panel-left" />
                    <RightSideBar id="floating-panel-right" />
                    <Monitor id="floating-panel-monitor" />
                </div>
            </n-config-provider>
        </n-message-provider>
    </n-dialog-provider>
</template>

<script setup>
import MapView from "@/components/map/MapViewOL.vue";
import { NConfigProvider, darkTheme, NMessageProvider, NDialogProvider } from "naive-ui";
import LeftSideBar from "@/components/sidebar_left/LeftSideBar.vue";
import RightSideBar from "@/components/toolbox/RightSideBar.vue";
import Header from "@/components/sidebar_left/Header.vue";
import Monitor from "@/components/monitor/Monitor.vue";


const themeOverrides = {
    Statistic: {
        "labelFontSize": "12px",
        "valueFontSize": "13px"
    }
}

</script>

<style scoped>
#app {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

#map {
    height: 100%;
    width: 100%;
}

#title-card {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}


#floating-panel-left {
    box-sizing: border-box;
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 5px;
    width: 300px;
    max-height: calc(100% - 115px);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: rgba(32, 32, 36, 0.95);
}

#floating-panel-right {
    box-sizing: border-box;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 300px;
    max-height: calc(100% - 125px);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: rgba(32, 32, 36, 0.95);
}

#floating-panel-monitor {
    box-sizing: border-box;
    position: absolute;
    bottom: 5px;
    right: 5px;
    max-height: 120px;
    width: 300px;
    background-color: rgba(32, 32, 36, 0.95);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>