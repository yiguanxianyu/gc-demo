<script setup>
import { useUsersStore } from '@/store/user.js'
import { NCheckbox, NDropdown, NEllipsis, NList, NListItem } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useUsersStore()
const { pattern, algorithms_dict } = storeToRefs(store)

let chosenItem = null
const xRef = ref(0)
const yRef = ref(0)
const showDropdown = ref(false)
const options = ref([
  {
    label: 'PLACEHOLDER',
    key: 'selected-item',
    disabled: true
  },
  // {
  //   label: '重命名',
  //   key: 'rename-path'
  // },
  {
    label: '移除图层',
    key: 'remove-layer'
  },
  // {
  //   label: '下载数据',
  //   key: 'download-dir'
  // },
  {
    label: '定位',
    key: 'locate-layer'
  }
])

const handleContextMenu = (e, item) => {
  chosenItem = item

  const path_split = item.path.split('/')
  const algo_output_dir = path_split[5]
  const algo_name = algorithms_dict.value[algo_output_dir]
  const path = [algo_name, ...path_split.slice(6)].join('/')
  options.value[0].label = path

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
