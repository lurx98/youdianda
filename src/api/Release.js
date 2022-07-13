import request from '@/utils/request'
export const updatedImgApi = (data) => request({
    method: "POST",
    headers: { 'Content-Type': 'multipart/form-data' },
    url: "/home/common/upload?type=images",
    data
})
export const addArticleApi = (data) => request({
    url: "/home/user/addArticle",
    method: "POST",
    data
})
