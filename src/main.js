import Vue from 'vue'
import App from './App.vue'
//引入导出的路由
import router from './router/index'
Vue.config.productionTip = false

import vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './api/request';

Vue.prototype.$request = request
Vue.use(vant);
Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
