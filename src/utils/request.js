// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function(config) {
        //请求发起经过这里
        // config 本次请求的配置对象
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        // 这里要返回config配置对象 否则请求就停在这里
        return config
    }, function(error) {
        // 请求出错，会进入这里
        return Promise.reject(error)
    })
    // 响应拦截器

export default request