import { defineStore } from 'pinia'
import axios from 'axios'

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            layers: [],
            data: [],
            algorithms: [],
            pattern: "",
            selectedItem: null,
        }
    },
    getters: {
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
            const pathArr = path.split('/');
            let node = this.data;
            let found;

            for (let i = 0; i < pathArr.length - 1; i++) {
                found = node.find(item => item.label === pathArr[i]);
                node = found.children;
            }
            return node.find(item => item.label === pathArr[pathArr.length - 1]);
        },
        checkLayerExists(path) {
            return this.layers.find(item => item.path === path);
        },
        addLayer(path) {
            console.log(path);
            const node = this.findNodeByPath(path);
            this.layers.push({
                label: node.label,
                path: path,
                checked: true
            });
        },
        addLayerItem(layerItem) {
            this.layers.push({
                label: layerItem.label,
                path: layerItem.path,
                checked: true
            });
        },
        fetchDirFromServer() {
            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "get-directory",
            }).then((response) => {
                console.log("Successfully fetched directory from server");
                this.data = response.data;
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
            // 移除图层
            if (this.checkLayerExists(path)) {
                this.layers = this.layers.filter(item => item.path !== path);
            }

            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "remove-path",
                "path": path
            }).then((response) => {
                this.fetchDirFromServer();
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
                if (layer) { layer.label = newLabel; }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
)