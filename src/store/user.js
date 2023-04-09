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
        updateName(path, name) {
            const node = this.findNodeByPath(path);
            node.label = name;

            let layer = this.layers.find(item => item.path === path);
            if (layer) {
                layer.label = name;
            }
        },
        checkLayerExists(path) {
            return this.layers.find(item => item.path === path);
        },
        addLayer(path) {
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
            let store = this;
            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "get-directory",
            }).then(function (response) {
                console.log("success");
                store.data = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        fetchAlgorithmsFromServer() {
            let store = this;
            axios.post(import.meta.env.VITE_BACKEND_POST_API, {
                "request-type": "get-algorithms",
            }).then(function (response) {
                console.log("success");
                store.algorithms = response.data;
                console.log(store.algorithms);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}
)