//文章请求模块
import request from '@/utils/request'

export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params: params
    })
}

// 获取文章详情
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}