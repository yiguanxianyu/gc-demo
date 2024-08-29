<template>
  <div id="container">
    <n-cascader
      :options="menuAlgorithms"
      value-field="key"
      check-strategy="child"
      v-model:value="selectedAlgo"
      placeholder="选择算法"
    ></n-cascader>

    <n-tree
      :data="menuData[selectedAlgo]"
      :node-props="nodeProps"
      :pattern="pattern"
      :show-irrelevant-nodes="false"
      class="tree"
      expand-on-click
      selectable
      @update:selected-keys="selectedKeyChanged"
    />
    <!-- @update:expanded-keys="updatePrefixWithExpaned"  -->

    <n-dropdown
      :options="options"
      :show="showDropdown"
      :x="xRef"
      :y="yRef"
      placement="bottom"
      trigger="manual"
      @clickoutside="showDropdown = false"
      @select="handleSelect"
    />
  </div>
</template>

<script setup>
import { useUsersStore } from '@/store/user.js'
// import { Folder, FolderOpenOutline } from '@vicons/ionicons5'
import { NCascader, NDropdown, NIcon, NTree, useDialog, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { h, onBeforeMount, ref } from 'vue'

const message = useMessage()
const dialog = useDialog()

const store = useUsersStore()

store.fetchOutputDataFromServer()

const { algorithms: menuAlgorithms, outputData: menuData, pattern } = storeToRefs(store)

const xRef = ref(0)
const yRef = ref(0)
const showDropdown = ref(false)
const options = ref([])
const selectedAlgo = ref()
let selectedItem = null

const addToLayer = () => {
  // console.log(selectedItem)
  //Check if layer exists
  if (store.checkLayerExists(selectedItem.key)) {
    message.error('已存在的图层不能重复添加')
    return
  }
  store.addLayer(selectedItem)
}

const previewFile = () => {
  message.error('该功能尚未实现')
}

const removePath = () => {
  const removeType = selectedItem.children ? '文件夹' : '文件'
  dialog.warning({
    title: `${removeType}删除警告`,
    content: `是否从服务器端永久删除该${removeType}？请注意，此过程是不可逆的！`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      store.removePath(selectedItem.path)
    }
  })
}

const downloadFile = () => {
  message.error('该功能尚未实现')
}

const selectedKeyChanged = (keys, option, meta) => {
  switch (meta.action) {
    case 'select':
      selectedItem = meta.node
      break
    case 'unselect':
      selectedItem = null
      break
  }
}

// const updatePrefixWithExpaned = (_keys, _option, meta) => {
// if (!meta.node) return
// switch (meta.action) {
//   case 'expand':
//     meta.node.prefix = () =>
//       h(NIcon, null, {
//         default: () => h(FolderOpenOutline)
//       })
//     break
//   case 'collapse':
//     meta.node.prefix = () =>
//       h(NIcon, null, {
//         default: () => h(Folder)
//       })
//     break
// }
// }

const nodeProps = ({ option }) => {
  return {
    oncontextmenu: (e) => {
      selectedItem = option
      if (option.children) {
        options.value = [
          {
            label: '目录：' + option.label,
            key: 'selected-folder',
            disabled: true
          },
          {
            label: '重命名',
            key: 'rename-path'
          },
          {
            label: '删除',
            key: 'remove-path'
          },
          {
            label: '下载',
            key: 'download-dir'
          }
        ]
      } else {
        options.value = [
          {
            label: '文件：' + option.label,
            key: 'selected-file',
            disabled: true
          },
          // {
          //   label: '预览',
          //   key: 'preview-file'
          // },
          {
            label: '添加到图层',
            key: 'add-to-layer'
          }
          // {
          //   label: '重命名',
          //   key: 'rename-path'
          // },
          // {
          //   label: '删除',
          //   key: 'remove-path'
          // },
          // {
          //   label: '下载',
          //   key: 'download-file'
          // }
        ]
      }

      xRef.value = e.clientX
      yRef.value = e.clientY
      showDropdown.value = true
      e.preventDefault()
    }
  }
}

const handleSelect = (option) => {
  switch (option) {
    case 'add-to-layer':
      addToLayer()
      break
    case 'preview-file':
      previewFile()
      break
    case 'rename-path':
      store.renamePath(selectedItem.path, selectedItem.label)
      break
    case 'remove-path':
      removePath()
      break
    case 'download-file':
      downloadFile()
      break
    case 'remove-dir':
      removeFile()
      break
    case 'download-dir':
      downloadFile()
      break
    default:
      console.log('Unknown option')
      break
  }
  showDropdown.value = false
}
</script>

<style lang="scss" scoped>
.button {
  padding: 5px;
}

:deep(.n-tree-node-indent) {
  width: 4px;
}

:deep(.n-cascader) {
  column-width: 400px;
  /* 调整为你想要的宽度 */
}
</style>
