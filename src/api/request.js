import axios from "axios";
import nprogress from 'nprogress'
import "nprogress/nprogress.css";
var request = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        

    },
})

//请求拦截器
request.interceptors.request.use(config => {
    //进度条开始动
    nprogress.start();
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config
})
// 响应拦截器
request.interceptors.response.use((res)=>{
    nprogress.done();
    return res;
},(error)=>{
    return Promise.reject(new Error('faile'));
});

export default request