import request from '@/utils/request'

export const getUserInfo = () => request({
    url: "/home/user/getUserInfo"
})
export const getUserArticleApi = (params) => request({
    url: "/home/user/myArticle",
    params
})
//删除接口
export const delArticleApi = (params) => request({
    url: "/home/user/delArticle",
    params
})

//收藏点赞接口
/* type: 1 收藏 2点赞
page: 1
limit: 10 */
export const getUserCollectApi = (params) => request({
    url: "/home/user/userDataList",
    params
})
export const cancelUserCollectApi = (params) => request({
    url: "/home/user/userDataHandle",
    params
})

