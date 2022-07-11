import axios from "axios"
import store from "@/store"
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://124.223.14.236:8060'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (store.state.user) {
        config.headers.token = store.state.user
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default instance
