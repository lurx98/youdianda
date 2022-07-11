import request from '@/utils/request'
export const getClassifyNewListApi = (params) => request({
    url: "/home/index/list",
    params
})
