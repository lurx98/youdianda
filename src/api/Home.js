import request from '@/utils/request'
export const getHomeIndexApi = () => request({
    url: "/home/index/index"
})
export const getHotArticlesApi = () => request({
    url: "/home/index/hot"
})
export const getNewArticlesApi = (params) => request({
    url: '/home/index/new',
    params
})
