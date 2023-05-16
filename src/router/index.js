//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
import List from '@/pages/List'
import Add from '@/pages/Add'
import Update from '@/pages/Update'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import Register from '@/pages/register'
//2.使用路由
Vue.use(VueRouter);
//3.创建VueRouter的实例
const router = new VueRouter({
    //tips:不想要 #（锚点）就添加下面代码
    mode: 'hash',
    //4.配置路由的path和组件
    routes: [
        {
            path: "/list",
            name: 'list',
            component: List,
            meta:{
                TabbarShow:true
            },
        },
        {
            path: "/add",
            name: 'add',
            component: Add,
            meta:{
                TabbarShow:true
            },
        },
        {
            path: "/detail/:item",
            name: 'detail',
            component: Detail,
            meta:{
                TabbarShow:false
            },
            props:true,
        },
        {
            path: "/update/:item",
            name: 'update',
            component: Update,
            props:true
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
        },
        {
            path: "/regiter",
            name: 'register',
            component: Register,
        },
        {
            path: '/',
            redirect: 'login'
        },
    ]
})
//5.导入路由实例
export default router

