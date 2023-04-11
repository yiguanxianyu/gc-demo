<script setup>
import axios from 'axios';
import { onMounted } from "vue";

import Map from 'ol/Map'
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import XYZ from 'ol/source/XYZ'
import Static from 'ol/source/ImageStatic';
import GeoTIFFSource from 'ol/source/GeoTIFF';
import Zoom from 'ol/control/Zoom';
import FullScreen from 'ol/control/FullScreen';
import Attribution from 'ol/control/Attribution'
import 'ol/ol.css'

let map;
// 影像图层
const tileLayer = new TileLayer({
    title: '天地图卫星影像',
    source: new XYZ({
        url: "https://t4.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + import.meta.env.VITE_API_KEY,
        attributions: ['Map data &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>'],
    })
})
// 标注图层
const tileMark = new TileLayer({
    title: '标注图层',
    source: new XYZ({
        url: "https://t4.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" + import.meta.env.VITE_API_KEY,
    })
})

const view = new View({
    center: fromLonLat([116.303, 39.99], 'EPSG:3857'),
    zoom: 16,
    maxZoom: 18,
})

const addPngLayerTest = () => {

    axios.get("http://localhost:5000/api/v1/get", {
        params: {
            method: "getItemInfo",
            path: "1.tif"
        }
    }).then(res => {
        console.log(res.data);
        const thumbnailId = res.data.thumbnailId;
        const extent_ws = fromLonLat(res.data.extent[0], 'EPSG:3857');
        const extent_en = fromLonLat(res.data.extent[1], 'EPSG:3857');
        const extent = extent_ws.concat(extent_en);
        console.log(extent);
        const testLayer = new ImageLayer({
            source: new Static({
                url: "http://localhost:5000/api/v1/get?method=getThumbnail&thumbnailId=" + thumbnailId,
                imageExtent: extent
            })
        })
        map.addLayer(testLayer);
        view.fit(extent);

    }).catch(err => {
        console.log(err);
    })
}

const addTiffLayerTest = () => {

    let reader = new FileReader();
    reader.readAsArrayBuffer("@/assets/1.tif");
    const fileBlob = new Blob([reader.result], { type: "image/tiff" });

    const testSource = new GeoTIFFSource({
        sources: [{ blob: fileBlob }],
        convertToRGB: true,
        normalize: true
    })

    const testLayer = new ImageLayer({
        source: testSource

    })
    map.addLayer(testLayer);
    view.fit(testSource.getView().getExtent());
}

onMounted(() => {
    map = new Map({
        target: 'map',
        layers: [tileLayer, tileMark],
        view: view,
        controls: []
    });

    map.addControl(new Zoom());
    map.addControl(new Attribution());

    addPngLayerTest()

})

</script>

<template>
    <div id="map"></div>
</template>

<style>
.ol-zoom {
    top: 30px;
    right: 310px;
    bottom: unset;
    left: unset;
    background-color: #e0e0e0;
}

.ol-attribution {
    top: 5px;
    right: 310px;
    bottom: unset;
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