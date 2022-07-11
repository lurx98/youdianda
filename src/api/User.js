import request from '@/utils/request'

export const getUserInfo = () => request({
    url: "/home/user/getUserInfo"
})
export const getUserArticleApi = (params) => request({
    url: "/home/user/myArticle",
    params
})
