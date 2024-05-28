<script setup>
import { useUsersStore } from '@/store/user.js'
import { NCheckbox, NDropdown, NEllipsis, NList, NListItem } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useUsersStore()
const { pattern } = storeToRefs(store)

const xRef = ref(0)
const yRef = ref(0)
const showDropdown = ref(false)
const options = ref([])
let chosenItem = null

const handleContextMenu = (e, item) => {
  chosenItem = item
  options.value = [
    {
      label: item.label,
      key: 'selected-item',
      disabled: true
    },
    {
      label: '重命名',
      key: 'rename-path'
    },
    {
      label: '删除',
      key: 'remove-layer'
    },
    {
      label: '下载',
      key: 'download-dir'
    },
    {
      label: '定位',
      key: 'locate-layer'
    }
  ]
  xRef.value = e.clientX
  yRef.value = e.clientY
  showDropdown.value = true
  e.preventDefault()
}

const handleSelect = (option) => {
  switch (option) {
    case 'move-up':
      break
    case 'move-down':
      break
    case 'locate-layer':
      store.locateLayer(chosenItem.path)
      break
    case 'rename-path':
      store.renamePath()
      break
    case 'download-path':
      downloadFile()
      break
    case 'remove-layer':
      store.removeLayer(chosenItem.path)
      break
  }
  showDropdown.value = false
}
</script>

<template>
  <div id="container">
    <!-- <n-tree id="tree" :data="store.getLayerTree" :node-props="nodeProps" :pattern="pattern"
                                                    :show-irrelevant-nodes="false" checkable key-field="path" /> -->

    <n-list>
      <template v-for="item in store.getLayerList">
        <n-list-item
          class="list-item"
          v-if="item.label.includes(pattern)"
          @contextmenu="handleContextMenu($event, item)"
        >
          <template #prefix>
            <n-checkbox default-checked @update:checked="store.setLayerVisibility(item.path, $event)" />
          </template>
          <n-ellipsis style="max-width: 260px">
            {{ item.label }}
          </n-ellipsis>
        </n-list-item>
      </template>
    </n-list>

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

<style>
.n-list .list-item {
  padding: 6px 0;
}

.n-list .n-list-item .n-list-item__prefix {
  margin-right: 5px;
  margin-left: 5px;
}
</style>
