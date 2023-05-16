<template>
    <div>
        <van-tabbar v-model="active" placeholder>
            <van-tabbar-item replace to="add" name="add" icon="home-o"
                ><span>添加</span>
                <template #icon="props">
                    <img
                        :src="props.active ? icon.addactive : icon.addinactive"
                    /> </template
            ></van-tabbar-item>
            <van-tabbar-item replace to="list" name="list" icon="search"
                ><span>库</span>
                <template #icon="props">
                    <img
                        :src="props.active ? icon.listactive : icon.listinactive"
                    /> </template
            ></van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    name: "Tabbar",
    data() {
        return {
            active: "add",
            icon: {
                addactive: require("../assets/tabbar/add-active.png"),
                addinactive: require("../assets/tabbar/add-inactive.png"),
                listactive: require("../assets/tabbar/list-active.png"),
                listinactive: require("../assets/tabbar/list-inactive.png"),
            },
        };
    },
    watch:{
        $route(val){
            this.active = val.name
        }
    },
    mounted(){
        this.active = this.$route.name
    }
};
</script>
<style lang="">
</style>