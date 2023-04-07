<script setup>
import {NListItem, NCheckbox, NButton, NSpace} from 'naive-ui'

const props = defineProps({
    title: String,
    type: String,
    checked: Boolean
})

</script>

<template>
    <n-list-item id="container">
        <n-checkbox id="checkbox" :checked="checked"></n-checkbox>{{ title }}
    </n-list-item>
</template>

<style scoped>
#container {
    text-align: left;
    padding: 0 0 5px 5px;
}

#checkbox {
    padding: 5px;
}
</style>
