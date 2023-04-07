<template>
    <div id="map"/>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.chinatmsproviders"
import {onMounted} from "vue";

let map;

const addMap = () => {
    map = L.map("map", {
        center: [39.99, 116.303],
        zoom: 15,
        attributionControl: false
    });
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
    L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {key: apikey, maxZoom: 18, minZoom: 5}).addTo(map);
    L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {key: apikey, maxZoom: 18, minZoom: 5}).addTo(map);
};

onMounted(() => {
    addMap();
    addScale(map);
    addTile(map);
});
</script>

<style scoped>
</style>
