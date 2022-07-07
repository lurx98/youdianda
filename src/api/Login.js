import request from '@/utils/request'


export const loginApi = (data) => request({
    method: "POST",
    url: "/home/index/login",
    data
})

