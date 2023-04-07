<script setup>
import Header from "./views/Header.vue";
import UserInfo from "./views/UserInfo.vue";
import LeftMenu from "./views/LeftMenu.vue";
</script>

<template>
    <div class="container">
        <Header id="title"></Header>
        <LeftMenu id="left-menu"></LeftMenu>
        <UserInfo id="user-info"></UserInfo>
    </div>
</template>


<style scoped>
.container {
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
