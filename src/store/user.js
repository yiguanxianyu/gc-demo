import {defineStore} from 'pinia'


// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            data: [{
                title: "相见恨晚",
                uuid: "99EEA228-4E1A-0F90-E44E-F8E208366CC6",
                type: "raster",
            }, {
                title: "他在时间门外",
                uuid: "71012B98-5B6A-E063-320A-D9DF7AAF4810",
                type: "vector",
            }, {
                title: "你在等待什么吗",
                uuid: "35DE9FF6-4399-3301-014E-AE0F312E33B4",
                type: "vector",
            }],
            layers: [{
                uuid: "99EEA228-4E1A-0F90-E44E-F8E208366CC6",
                title: "相见恨晚",
                type: "raster",
                checked: true
            }],
            algorithms: [{
                label: "数据管理",
                key: "menu-data-management",
                children: [{
                    label: "栅格运算",
                    key: "data-upload",
                    text: "这个呢就是数据上传的功能",
                    arguments: [{
                        description: "输入文件",
                        inputType: "raster",
                        required: true
                    }, {
                        description: "输出文件名",
                        inputType: "common",
                        required: true
                    }, {
                        description: "某个参数",
                        inputType: "common",
                        required: false
                    }]
                }, {
                    label: "数据下载",
                    key: "data-download",
                    text: "这个呢就是数据下载的功能",
                    arguments: [{
                        description: "arg1",
                        inputType: "vector",
                        required: true
                    }, {
                        description: "arg2",
                        inputType: "common",
                        required: true
                    }, {
                        description: "arg3",
                        inputType: "common",
                        required: false
                    }]
                }]
            }, {
                label: "基础分析",
                key: "menu-basic-analysis",
                children: [{
                    label: "NDVI计算",
                    key: "ndvi-calculation",
                    text: "这个呢就是NDVI计算的功能",
                    arguments: [{
                        description: "arg1",
                        inputType: "raster",
                        required: true
                    }, {
                        description: "arg2",
                        inputType: "common",
                        required: false
                    }]
                }]
            }]
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
        },
        getRasterArray(state) {
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
    }
})