<script setup>
import Header from "./Header.vue";
import UserInfo from "./views/UserInfo.vue";
import Tabs from "./views/Tabs.vue";
import {NInput} from "naive-ui";
import {useUsersStore} from "@/store/user";
import {storeToRefs} from 'pinia';

const store = useUsersStore();
const {pattern} = storeToRefs(store)
</script>

<template>
    <div class="container">
        <n-input v-model:value="pattern" placeholder="搜索" />
        <Tabs id="left-menu" />
    </div>
</template>


<style scoped>
/* Setting container css to flex can prevent Tree from overflowing */
.container {
    display: flex;
    flex-direction: column;
}
</style>
