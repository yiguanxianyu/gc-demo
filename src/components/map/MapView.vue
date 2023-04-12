<script setup>
import { onMounted } from "vue";
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import XYZ from 'ol/source/XYZ'
import Zoom from 'ol/control/Zoom';
import Attribution from 'ol/control/Attribution'
import { useUsersStore } from "@/store/user.js";
import 'ol/ol.css'

const store = useUsersStore();

// 底图图层组
const tileLayerGroup = new LayerGroup({
    layers: [
        new TileLayer({
            title: '天地图卫星影像',
            source: new XYZ({
                url: "https://t4.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + import.meta.env.VITE_API_KEY,
                attributions: ['Map data &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>'],
            })
        }), new TileLayer({
            title: '标注图层',
            source: new XYZ({
                url: "https://t4.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" + import.meta.env.VITE_API_KEY,
            })
        })]
})

onMounted(() => {
    new Map({
        target: 'map',
        layers: [tileLayerGroup, store.layerGroup],
        view: store.view,
        controls: [new Zoom(), new Attribution()]
    });
})
</script>

<template>
    <div id="map"></div>
</template>

<style>
.ol-zoom {
    top: unset;
    right: 310px;
    bottom: 30px;
    left: unset;
    background-color: #e0e0e0;
}

.ol-attribution {
    top: unset;
    right: 310px;
    bottom: 5px;
    left: unset;
    background-color: #e0e0e0;
}

.ol-attribution ul {
    text-shadow: unset;
    font-weight: 600
}

.ol-attribution a {
    color: #2669dd;
}


#map {
    --ol-background-color: rgba(33, 33, 33, 0.95);
    --ol-subtle-foreground-color: #ffffff;
    --ol-partial-background-color: #f0f0f0
}
</style>