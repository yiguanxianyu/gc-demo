<template>
    <div id="map" />
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.chinatmsproviders"
import { onMounted } from "vue";

let map;

const addMap = () => {
    map = L.map("map", {
        center: [39.99, 116.303],
        zoom: 15,
    });
    const attribution = map.attributionControl;
    attribution.setPrefix("Leaflet");
    attribution.addAttribution('Map data &copy; <a href="https://www.tianditu.gov.cn/">Tianditu</a>');
    attribution.addAttribution("made by yiguanxianyu");
};

const addScale = map => {
    L.control.scale({
        maxWidth: 100,
        metric: true,
        imperial: false,
    }).addTo(map);
};

const apikey = "d9262a81b7661921ef0606542b8d6653"
const addTile = map => {
    L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', { key: apikey, maxZoom: 18, minZoom: 5 }).addTo(map);
    L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', { key: apikey, maxZoom: 18, minZoom: 5 }).addTo(map);
};

onMounted(() => {
    addMap();
    addScale(map);
    addTile(map);
});
</script>

<style scoped></style>
