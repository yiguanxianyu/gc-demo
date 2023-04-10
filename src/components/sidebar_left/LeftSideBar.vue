<script setup>
import Header from "./views/Header.vue";
import UserInfo from "./views/UserInfo.vue";
import LeftMenu from "./views/LeftMenu.vue";
import { NInput } from "naive-ui";
import { useUsersStore } from "@/store/user";
import { storeToRefs } from 'pinia';

const store = useUsersStore();
const { pattern } = storeToRefs(store)
</script>

<template>
    <div class="container">
        <Header id="title"></Header>
        <n-input placeholder="搜索" v-model:value="pattern"></n-input>
        <LeftMenu id="left-menu"></LeftMenu>
        <UserInfo id="user-info"></UserInfo>
    </div>
</template>


<style scoped>
.container {
    min-width: 250px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
}

#title {
    background-color: #4caf50;

}

#user-info {
    background-color: #de3535;
}

#left-menu {
    flex: 1;
    margin: 0;
    padding: 0;
}
</style>
