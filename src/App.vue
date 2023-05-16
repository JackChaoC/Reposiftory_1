<template>
    <div id="app">
        <router-view></router-view>
        <tabbar v-show="$route.meta.TabbarShow" />
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";

export default {
    name: "App",
    data() {
        return {};
    },
    components: {
        Tabbar,
    },
};
</script>

<style lang="less">
* {
    padding: 0;
    margin: 0;
}
html,
body,
#app {
    height: 100%;
    width: 100%;
    background-color: rgb(249, 249, 249);
    overflow: hidden;
}
</style>
