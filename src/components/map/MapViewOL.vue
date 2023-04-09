<script setup>
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ'
import 'ol/ol.css'
import {onMounted} from "vue";

let map;
// 影像图层
const tileLayer = new TileLayer({
    title: '天地图卫星影像',
    source: new XYZ({
        url: `http://t4.tianditu.com/DataServer?T=img_w&tk=${import.meta.env.VITE_API_KEY}&x={x}&y={y}&l={z}`,
        attributions: ['Map data &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>', 'made by yiguanxianyu'],
    })
})
// 标注图层
const tileMark = new TileLayer({
    title: '标注图层',
    source: new XYZ({
        url: `http://t4.tianditu.com/DataServer?T=cia_w&tk=${import.meta.env.VITE_API_KEY}&x={x}&y={y}&l={z}`,
    })
})

const view = new View({
    center: [0, 0],
    zoom: 2,
})

onMounted(() => {
    map = new Map({
        target: 'map',
        layers: [tileLayer, tileMark],
        view: view,
    });
})

</script>

<template>
    <div id="map" class="map-home"></div>
</template>

<style scoped>
</style>