import { defineStore } from 'pinia'
import axios from 'axios'
import { h } from 'vue'
import { NIcon } from "naive-ui";
import { Folder, FileTrayFullOutline } from "@vicons/ionicons5";
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import LayerGroup from 'ol/layer/Group';
import { fromLonLat } from 'ol/proj';
import Static from 'ol/source/ImageStatic';

const addPngLayerTest = () => {
    axios.get(import.meta.env.VITE_BACKEND_POST_API + "/get", {
        params: {
            method: "getItemInfo",
            path: "1.tif"
        }
    }).then(res => {
        // console.log(res.data);
        const thumbnailId = res.data.thumbnailId;
        const extent_ws = fromLonLat(res.data.extent[0], 'EPSG:3857');
        const extent_en = fromLonLat(res.data.extent[1], 'EPSG:3857');
        const extent = extent_ws.concat(extent_en);
        // console.log(extent);
        const testLayer1 = new ImageLayer({
            source: new Static({
                url: "http://localhost:5000/api/v1/get?method=getThumbnail&thumbnailId=" + thumbnailId,
                imageExtent: extent
            })
        })
        const testLayer2 = new ImageLayer({
            source: new Static({
                url: "http://localhost:5000/api/v1/get?method=getThumbnail&thumbnailId=" + thumbnailId,
                imageExtent: extent
            })
        })
        map.addLayer(testLayer1);
        map.addLayer(testLayer2);
        view.fit(extent);
        testLayer1.shit = 1;
        console.log(map.getLayers());

    }).catch(err => {
        console.log(err);
    })
}

const addImageLayer = (path) => {
    axios.get(import.meta.env.VITE_BACKEND_POST_API + "/get", {
        params: {
            method: "getItemInfo",
            path: path
        }
    }).then(res => {
        const thumbnailId = res.data.thumbnailId;
        const extent_ws = fromLonLat(res.data.extent[0], 'EPSG:3857');
        const extent_en = fromLonLat(res.data.extent[1], 'EPSG:3857');
        const extent = extent_ws.concat(extent_en);

        const source = new Static({
            url: import.meta.env.VITE_BACKEND_POST_API + "/get?method=getThumbnail&thumbnailId=" + thumbnailId,
            imageExtent: extent
        })

        const layer = new ImageLayer({ source })
        map.addLayer(layer);
        view.fit(extent);

    }).catch(err => {
        console.log(err);
    })
}




// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            layers: [],
            layerGroup: new LayerGroup({}),
            data: [],
            algorithms: [],
            pattern: "",
            selectedItem: null,
            view: new View({
                center: fromLonLat([116.303, 39.99], 'EPSG:3857'),
                zoom: 8,
                maxZoom: 18,
            })
        }
    },
    getters: {
        getLayerTree(state) {
            return state.layerGroup.getLayers().getArray().map(item => item._state);
        },
        getVectorArray(state) {
            let vectorArray = [];
            state.data.forEach(item => {
                if (item.type === "vector") {
                    vectorArray.push({
                        label: item.title,
                        value: item.uuid
                    })
                }
            })
            return vectorArray
        }, getRasterArray(state) {
            let rasterArray = [];
            state.data.forEach(item => {
                if (item.type === "raster") {
                    rasterArray.push({
                        label: item.title,
                        value: item.uuid
                    })
                }
            })
            return rasterArray
        }
    },
    actions: {
        findNodeByPath(path) {
            const node = this.findNodeParentByPath(path);
            return node.find(item => item.label === pathArr[pathArr.length - 1]);
        },
        findNodeParentByPath(path) {
            const pathArr = path.split('/');
            let node = this.data;
            let found;

            for (let i = 0; i < pathArr.length - 1; i++) {
                found = node.find(item => item.label === pathArr[i]);
                node = found.children;
            }
            return node;
        },
        checkLayerExists(path) {
            /**
             * 返回的是目标Layer或者false
             * @param {String} path
             */
            return this.layerGroup.getLayers().getArray().find(item => {
                item._state.path === path
            })
        },
        addLayer() {
            axios.get(import.meta.env.VITE_BACKEND_POST_API + "/get", {
                params: {
                    method: "getItemInfo",
                    path: "1.tif"
                }
            }).then(res => {
                const thumbnailId = res.data.thumbnailId;
                const extent_ws = fromLonLat(res.data.extent[0], 'EPSG:3857');
                const extent_en = fromLonLat(res.data.extent[1], 'EPSG:3857');
                const extent = extent_ws.concat(extent_en);

                const layerToAdd = new ImageLayer({
                    source: new Static({
                        url: import.meta.env.VITE_BACKEND_POST_API + "/get?method=getThumbnail&thumbnailId=" + thumbnailId,
                        imageExtent: extent
                    })
                })
                layerToAdd._state = {
                    label: this.selectedItem.label,
                    path: this.selectedItem.path,
                    checked: true
                }
                this.layerGroup.getLayers().push(layerToAdd);
                this.view.fit(extent);
            }).catch(err => {
                console.log(err);
            })
        },
        setLayerVisibility(path, visibility) {
            const layer = this.checkLayerExists(path);
            layer.setVisible(visibility);
        },
        addTreePrefixSuffix(tree) {
            const traverseTree = node => {
                if (node.children) {
                    for (let child of node.children) {
                        traverseTree(child);
                    }
                    node.prefix = () => h(NIcon, null, {
                        default: () => h(Folder)
                    });
                } else {
                    node.prefix = () => h(NIcon, null, {
                        default: () => h(FileTrayFullOutline)
                    });
                }
            }

            for (let node of tree) {
                traverseTree(node);
            }

            return tree;
        },
        fetchDirFromServer() {
            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "get-directory",
            }).then((response) => {
                // console.log("Successfully fetched directory from server");
                this.data = this.addTreePrefixSuffix(response.data);
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchAlgorithmsFromServer() {
            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "get-algorithms",
            }).then((response) => {
                this.algorithms = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        removePath() {
            // 移除图层
            const path = this.selectedItem.path;
            this.layerGroup.getLayers().remove(this.checkLayerExists(path));

            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "remove-path",
                "path": path
            }).then((response) => {
                const parentArr = this.findNodeParentByPath(path);
                const index = parentArr.findIndex(item => item.path === path);
                parentArr.splice(index, 1);
            }).catch((error) => {
                console.log(error);
            })
        },
        renamePath() {
            const newLabel = window.prompt("请输入新的名称", this.selectedItem.label);
            if (newLabel === null) return;

            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "rename-path",
                "path": this.selectedItem.path,
                "new-name": newLabel
            }).then((response) => {
                this.fetchDirFromServer();
                let layer = this.checkLayerExists(this.selectedItem.path);
                if (layer) { layer._state.label = newLabel; }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
)