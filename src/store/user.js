import {defineStore} from 'pinia'


// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            exampleData: [{
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
            }]
        }
    },
    getters: {}
})