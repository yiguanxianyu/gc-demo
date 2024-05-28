<script setup>
import { useUsersStore } from '@/store/user.js'
import Attribution from 'ol/control/Attribution'
import Zoom from 'ol/control/Zoom'
import LayerGroup from 'ol/layer/Group'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import XYZ from 'ol/source/XYZ'
import { onMounted } from 'vue'
import 'ol/ol.css'
import xinjiangBoundary from '@/components/map/xjBoundary.js'
import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import { Stroke, Style } from 'ol/style'

const store = useUsersStore()

// 底图图层组
const baseMapLayerGroup = new LayerGroup({
  // 靠前的图层位于显示的底层
  layers: [
    new TileLayer({
      title: '天地图卫星影像',
      source: new XYZ({
        url: 'https://t4.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + import.meta.env.VITE_API_KEY,
        attributions: ['Map data &copy; <a href="https://www.tianditu.gov.cn/">天地图</a>']
      })
    }),
    new TileLayer({
      title: '标注图层',
      source: new XYZ({
        url: 'https://t4.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + import.meta.env.VITE_API_KEY
      })
    }),
    new VectorLayer({
      title: '新疆边界',
      source: new VectorSource({
        features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(xinjiangBoundary)
      }),
      style: new Style({
        stroke: new Stroke({
          color: '#eeff88',
          width: 3
        })
      })
    })
  ]
})

onMounted(() => {
  new Map({
    target: 'map',
    layers: [baseMapLayerGroup, store.layerGroup],
    view: store.view,
    controls: [new Zoom(), new Attribution()]
  })
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
  font-weight: 600;
}

.ol-attribution a {
  color: #2669dd;
}

#map {
  --ol-background-color: rgba(33, 33, 33, 0.95);
  --ol-subtle-foreground-color: #ffffff;
  --ol-partial-background-color: #f0f0f0;
}
</style>
