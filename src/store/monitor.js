import { defineStore } from 'pinia'
import axios from 'axios'

// 第一个参数是应用程序中 store 的唯一 id
export const useMonitorStore = defineStore('monitor', {
    // 其它配置项
    state: () => {
        return {
            numImages: 0,
            numVectors: 0,
            numAlgorithms: 0,
            cpuUsage: 0,
            memoryUsage: 0,
            gpuUsage: 0,
            gpuMemoryUsage: 0,
            diskUsage: 0,
        }
    },
    getters: {

    },
    actions: {
        autoUpdate() {
            setInterval(() => {
                axios.get(import.meta.env.VITE_BACKEND_POST_API + "/get/monitor").then(res => {
                    this.numImages = res.data.numImages;
                    this.numVectors = res.data.numVectors;
                    this.numAlgorithms = res.data.numAlgorithms;
                    this.cpuUsage = res.data.cpuUsage;
                    this.memoryUsage = res.data.memoryUsage;
                    this.gpuUsage = res.data.gpuUsage;
                    this.gpuMemoryUsage = res.data.gpuMemoryUsage;
                    this.diskUsage = res.data.diskUsage;
                })
            }, 1000)
        }
    }
}
)