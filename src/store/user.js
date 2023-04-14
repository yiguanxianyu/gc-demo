import { defineStore } from 'pinia'
import axios from 'axios'
import { h } from 'vue'
import { NIcon, useMessage } from "naive-ui";
import { Folder, FileTrayFullOutline } from "@vicons/ionicons5";
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import LayerGroup from 'ol/layer/Group';
import { fromLonLat } from 'ol/proj';
import Static from 'ol/source/ImageStatic';

const getSomeTree = (state, type) => {
    if (type === "raster" || type === "vector") {
        const suffixes = type === "raster" ? ['.tif', '.tiff'] : ['.shp', '.geojson'];
        const isFileWithValidSuffix = (node) => {
            return !node.children && suffixes.some(suffix => node.label.endsWith(suffix));
        };

        const traverse = (node) => {
            if (node.children) {
                const filteredChildren = node.children.map(traverse).filter(child => child !== null);
                return { ...node, children: filteredChildren, disabled: true };
            } else {
                return isFileWithValidSuffix(node) ? node : null;
            }
        };

        let resultArr = [];
        for (let node of state.data) {
            resultArr.push(traverse(node));
        }
        return resultArr;
    } else if (type === "dir") {
        const traverse = (node) => {
            if (node.children) {
                const filteredChildren = node.children.map(traverse).filter(child => child !== null);
                return { ...node, children: filteredChildren};
            } else {
                return null; // 过滤掉所有的文件
            }
        };

        let resultArr = [];
        for (let node of state.data) {
            resultArr.push(traverse(node));
        }
        console.log(resultArr);
        return resultArr;
    }

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
            view: new View({
                center: fromLonLat([116.303, 39.99], 'EPSG:3857'),
                zoom: 8,
                maxZoom: 18,
            })
        }
    },
    getters: {
        getLayerList(state) {
            return state.layerGroup.getLayers().getArray().map(item => item.layerInfo);
        },
        getRasterTree(state) {
            return getSomeTree(state, "raster");
        },
        getVectorTree(state) {
            return getSomeTree(state, "vector");
        },
        getDirTree(state) {
            return getSomeTree(state, "dir");
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
            return this.layerGroup.getLayers().getArray().find(
                item => item.layerInfo.path === path
            )
        },
        addLayer(selectedItem) {
            axios.get(import.meta.env.VITE_BACKEND_POST_API + "/get", {
                params: {
                    method: "getItemInfo",
                    path: selectedItem.path
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
                layerToAdd.layerInfo = {
                    label: selectedItem.label,
                    path: selectedItem.path
                }
                this.layerGroup.getLayers().push(layerToAdd);
                this.view.fit(extent);
            }).catch(error => {
                console.log(error);
            })
        },
        removeLayer(path) {
            this.layerGroup.getLayers().remove(this.checkLayerExists(path));
        },
        setLayerVisibility(path, visibility) {
            this.checkLayerExists(path).setVisible(visibility);
        },
        locateLayer(path) {
            this.view.fit(this.checkLayerExists(path).getSource().getImageExtent(), {
                duration: 1000
            });
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
        removePath(path) {
            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "remove-path",
                "path": path
            }).then(res => {
                const parentArr = this.findNodeParentByPath(path);
                const index = parentArr.findIndex(item => item.path === path);
                parentArr.splice(index, 1);
                this.removeLayer(path);
            }).catch((error) => {
                console.log(error);
            })
        },
        renamePath(path, oldLabel) {
            const newLabel = window.prompt("请输入新的名称", oldLabel);
            if (newLabel === null) return;

            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "rename-path",
                "path": path,
                "new-name": newLabel
            }).then((response) => {
                let layer = this.checkLayerExists(path);
                if (layer) { layer.layerInfo.label = newLabel; }
                this.findNodeByPath(path).layerInfo.label = newLabel;
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
)