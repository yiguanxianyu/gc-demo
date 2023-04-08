<template>
    <n-form id="input_form" :model="formValue">
        <n-form-item v-for="(arg, index) in argArray" :label="arg.description" :path="arg.value" :rule="{
            required: arg.required,
            message: '请输入',
            trigger: ['input', 'blur']
        }">
            <n-input v-if="arg.inputType === 'common'" />
            <n-select v-if="arg.inputType === 'raster'" v-model:value="value" :options="store.getRasterArray" />
            <n-select v-if="arg.inputType === 'vector'" v-model:value="value" :options="store.getVectorArray" />
        </n-form-item>
    </n-form>
</template>

<script setup>
import { ref } from "vue";
import { useMessage, NForm, NFormItem, NInput, NSelect } from "naive-ui";
import { useUsersStore } from "@/store/user.js";

const store = useUsersStore();
const value = ref("")
const formValue = ref([]);

defineProps({
    argArray: {
        type: Array,
        required: true
    },
});

defineEmits(["update:arg-array"]);

</script>

<style scoped>
#input_form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto
}
</style>