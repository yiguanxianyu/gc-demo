<template>
    <n-form id="input_form" :model="formValue">
        <!-- item.value是除了文件名之外的写法，item.dir+filename是文件名的写法 -->
        <n-form-item v-for="(item, index) in formValue.args" :label="item.description" :path="`arg[${index}]`">
            <n-tree-select v-if="item.argType === 'input-raster'" v-model:value="item.value" :options="store.getRasterTree"
                key-field="path" filterable :consistent-menu-width="false" />

            <n-tree-select v-if="item.argType === 'input-file'" v-model:value="item.value" :options="getExtTree(item.ext)"
                key-field="path" filterable :consistent-menu-width="false" />

            <n-tree-select ref="treeRef" v-if="item.argType === 'output-raster'" v-model:value="item.dir" key-field="path"
                :options="store.getDirTree" filterable default-expand-all :consistent-menu-width="false">
                <template #action>
                    <div style="display:flex;flex-direction: row;justify-content: space-between;">
                        <n-input placeholder="输出文件名" v-model:value="item.outputName" />
                        <n-button @click="setDefaultFileName(item)">默认</n-button>
                    </div>
                </template>
            </n-tree-select>

            <n-tree-select v-if="item.argType === 'input-folder'" v-model:value="item.value" key-field="path"
                :options="store.getDirTree" filterable />

            <n-tree-select ref="treeRef" v-if="item.argType === 'output-folder'" v-model:value="item.dir" key-field="path"
                :options="store.getDirTree" filterable default-expand-all :consistent-menu-width="false">
                <template #action>
                    <div style="display:flex;flex-direction: row;justify-content: space-between;">
                        <n-input placeholder="输出文件夹" v-model:value="item.outputName" />
                        <n-button @click="setDefaultFileName(item)">默认</n-button>
                    </div>
                </template>
            </n-tree-select>

            <n-tree-select v-if="item.argType === 'output-vector'" v-model:value="item.dir" key-field="path"
                :options="store.getDirTree" filterable default-expand-all>
                <template #action>
                    <n-input v-model:value="item.outputName" />
                    <n-button>默认</n-button>
                </template>
            </n-tree-select>

            <n-input v-if="item.argType === 'output-vector'" v-model:value="item.value" />

            <n-input v-if="item.argType === 'string'" v-model:value="item.value" />

            <n-select v-if="item.argType === 'select'" v-model:value="item.value" :options="item.options" />
        </n-form-item>
    </n-form>
</template>

<script setup>
import { ref } from "vue";
import { NForm, NFormItem, NInput, NSelect, NTreeSelect, NButton } from "naive-ui";
import { useUsersStore } from "@/store/user.js";

const store = useUsersStore();
const treeRef = ref(null);

const props = defineProps({
    argArray: {
        type: Array,
        required: true
    },
});

const getExtTree = store.getExtTree;

const formValue = ref({
    args: props.argArray
});

const setDefaultFileName = (item) => {
    const fullPath = formValue.value.args[0].value;
    if (fullPath === null) {
        return;
    }
    const lastSlashIndex = fullPath.lastIndexOf("/");
    const lastDotIndex = fullPath.lastIndexOf(".");
    const fileNameWithoutExtension = fullPath.substring(lastSlashIndex + 1, lastDotIndex);

    item.outputName = fileNameWithoutExtension + item.defaultSuffix;
    item.dir = fullPath.substring(0, lastSlashIndex);
}

for (let i = 0; i < props.argArray.length; i++) {
    const arg = props.argArray[i];
    if (arg.argType === 'output-raster' || arg.argType === 'output-vector') {
        arg.dir = "";
        arg.fileName = "";
    } else {
        arg.value = null;
    }
}
</script>

<style scoped>
#input_form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto
}
</style>