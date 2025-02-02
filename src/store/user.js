import { FileTrayFullOutline, Folder } from '@vicons/ionicons5'
import axios from 'axios'
import { NIcon } from 'naive-ui'
import LayerGroup from 'ol/layer/Group'
import ImageLayer from 'ol/layer/Image'
import Static from 'ol/source/ImageStatic'
import View from 'ol/View'
import { defineStore } from 'pinia'
import { h } from 'vue'

// const _getSomeTree = (state, type) => {
//   if (type.startsWith('.')) {
//     const suffix = type.toLowerCase()
//     const traverse = (node) => {
//       if (node.children) {
//         const filteredChildren = node.children.map(traverse).filter((child) => child !== null)
//         return { ...node, children: filteredChildren, disabled: true }
//       }
//       const fileWithValidSuffix = node.label.toLowerCase().endsWith(suffix)
//       return fileWithValidSuffix ? node : null
//     }
//     return state.data.map(traverse).filter((node) => node !== null)
//   } else if (type === 'raster' || type === 'vector') {
//     const suffixes = type === 'raster' ? ['.tif', '.tiff'] : ['.shp', '.geojson']

//     const traverse = (node) => {
//       if (node.children) {
//         const filteredChildren = node.children.map(traverse).filter((child) => child !== null)
//         return { ...node, children: filteredChildren, disabled: true }
//       }
//       const fileWithValidSuffix = suffixes.some((suffix) => node.label.toLowerCase().endsWith(suffix))
//       return fileWithValidSuffix ? node : null
//     }
//     return state.data.map(traverse).filter((node) => node !== null)
//   } else if (type === 'dir') {
//     const traverse = (node) => {
//       if (node.children) {
//         const filteredChildren = node.children.map(traverse).filter((child) => child !== null)
//         return { ...node, children: filteredChildren }
//       }
//       return null // 过滤掉所有的文件
//     }
//     return state.data.map(traverse).filter((node) => node !== null)
//   }
// }

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
  // 其它配置项
  state: () => {
    return {
      layers: [],
      layerGroup: new LayerGroup({}), //存放图层
      outputData: {}, //存放文件数据
      inputData: null,
      algoInfoText: null,
      algorithms: [], //存放算法数据
      algorithms_dict: {},
      pattern: '', //用于搜索的匹配字符串
      view: new View({
        center: [9400000, 5200000],
        zoom: 6,
        maxZoom: 18
      })
    }
  },
  getters: {
    getLayerList(state) {
      const reversedArr = []
      const arr = state.layerGroup.getLayers().getArray()
      for (let i = arr.length - 1; i >= 0; i--) {
        reversedArr.push(arr[i].layerInfo)
      }
      return reversedArr
    }
    // getRasterTree(state) {
    //   return _getSomeTree(state, 'raster')
    // },
    // getVectorTree(state) {
    //   return _getSomeTree(state, 'vector')
    // },
    // getDirTree(state) {
    //   return _getSomeTree(state, 'dir')
    // },
    // getExtTree(state) {
    //   return (ext) => _getSomeTree(state, ext)
    // }
  },
  actions: {
    findNodeByPath(path) {
      const nodeLabel = path.split('/').pop()
      const node = this.findNodeParentByPath(path)
      return node.find((item) => item.label === nodeLabel)
    },
    findNodeParentByPath(path) {
      const pathArr = path.split('/')
      let node = this.outputData.value

      for (let i = 0; i < pathArr.length - 1; i++) {
        node = node.find((item) => item.label === pathArr[i]).children
      }
      return node
    },
    checkLayerExists(path) {
      /**
       * 返回的是目标Layer或者false
       * @param {String} path
       */
      return this.layerGroup
        .getLayers()
        .getArray()
        .find((item) => item.layerInfo.path === path)
    },
    addLayer(selectedItem) {
      axios
        .get(import.meta.env.VITE_BACKEND_API + '/get/iteminfo', {
          params: {
            path: selectedItem.key
          }
        })
        .then((res) => {
          // const thumbnailId = res.data.thumbnailId
          const extent = res.data.extent

          const layerToAdd = new ImageLayer({
            source: new Static({
              url: import.meta.env.VITE_BACKEND_API + '/get/thumbnail/?path=' + selectedItem.key,
              imageExtent: extent
            })
          })
          // const layerToAdd = new ImageLayer({
          //   source: new Static({
          //     url: import.meta.env.VITE_BACKEND_API + '/get/thumbnail/?thumbnailId=' + thumbnailId,
          //     imageExtent: extent
          //   })
          // })

          // Add GeoTIFF Layer but very poor performance
          // const layerToAdd = new TileLayer({
          //     source: new GeoTIFF({
          //         sources: [
          //             {
          //                 url: import.meta.env.VITE_BACKEND_API + "/get/thumbnail/?thumbnailId=" + thumbnailId,
          //                 overviews: [import.meta.env.VITE_BACKEND_API + "/get/ovr/?thumbnailId=" + thumbnailId],
          //             }
          //         ],
          //         sourceOptions: {
          //             allowFullFile: true
          //         },
          //         convertToRGB: true,
          //         interpolate: false
          //     })
          // })
          layerToAdd.layerInfo = {
            label: selectedItem.label,
            path: selectedItem.key
          }
          // 插入头部，防止checkbox被遮挡
          this.layerGroup.getLayers().insertAt(0, layerToAdd)
          this.view.fit(extent)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeLayer(path) {
      this.layerGroup.getLayers().remove(this.checkLayerExists(path))
    },
    setLayerVisibility(path, visibility) {
      this.checkLayerExists(path).setVisible(visibility)
    },
    locateLayer(path) {
      this.view.fit(this.checkLayerExists(path).getSource().getImageExtent(), {
        duration: 1000
      })
    },
    addTreePrefixSuffix(tree) {
      // Add prefix icon to tree items
      const traverseTree = (node) => {
        node.children?.forEach(traverseTree)
        node.prefix = () =>
          h(NIcon, null, {
            default: () => h(node.children ? Folder : FileTrayFullOutline)
          })
      }
      tree.forEach(traverseTree)
      return tree
    },
    fetchOutputDataFromServer() {
      // Fetch directory tree from server
      axios
        .get(import.meta.env.VITE_BACKEND_API + '/get/directory/output')
        .then((response) => {
          this.outputData = response.data
          for (const [key, value] of Object.entries(response.data)) {
            this.outputData[key] = this.addTreePrefixSuffix(value)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchInputDataFromServer() {
      axios
        .get(import.meta.env.VITE_BACKEND_API + '/get/directory/input')
        .then((response) => {
          this.inputData = response.data[0]
          this.algoInfoText = response.data[1]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchAlgorithmsFromServer() {
      // Fetch algorithms from server
      axios
        .get(import.meta.env.VITE_BACKEND_API + '/get/algorithms')
        .then((response) => {
          this.algorithms = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      axios
        .get(import.meta.env.VITE_BACKEND_API + '/get/algorithms_dict')
        .then((response) => {
          this.algorithms_dict = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removePath(path) {
      // Remove path from server
      axios
        .post(import.meta.env.VITE_BACKEND_API + '/post/remove', {
          path: path
        })
        .then((_res) => {
          // const parentArr = this.findNodeParentByPath(path)
          // const index = parentArr.findIndex((item) => item.path === path)
          // parentArr.splice(index, 1)
          this.fetchOutputDataFromServer()
          this.removeLayer(path)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    renamePath(path, oldLabel) {
      // Rename some file on server
      const newLabel = window.prompt('请输入新的名称', oldLabel)
      if (newLabel === null) return

      axios
        .post(import.meta.env.VITE_BACKEND_API + '/post/rename', {
          path: path,
          'new-name': newLabel
        })
        .then((_response) => {
          let layer = this.checkLayerExists(path)
          if (layer) {
            layer.layerInfo.label = newLabel
          }
          this.findNodeByPath(path).layerInfo.label = newLabel
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
