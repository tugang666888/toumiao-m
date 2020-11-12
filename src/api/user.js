// 用户相关请求
import request from "@/utils/request"
import store from "@/store"

export const login = (data) => {
    return request({
        method: "POST",
        url: "/app/v1_0/authorizations",
        data: data,
    })
}

// 发送验证码
export const sendSms = (mobile) => {
    return request({
        method: "GET",
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return request({
        method: "GET",
        url: "/app/v1_0/user",
        headers: {
            Authorization: `Bearer ${store.state.user.token}`,
        },
    })
}

// 获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: "GET",
        url: "/app/v1_0/user/channels",
    })
}

// 关注用户
export const addFollow = (target) => {
    return request({
        method: "POST",
        url: "/app/v1_0/user/followings",
        data: {
            target,
        },
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: "DELETE",
        url: `/app/v1_0/user/followings/${target}`,
    })
}

// 获取用户个人资料
export const getUserProfile = (target) => {
    return request({
        method: "GET",
        url: "/app/v1_0/user/profile",
    })
}

// 更新用户个人资料
export const updateUserProfile = (data) => {
    return request({
        method: "PATCH",
        url: "/app/v1_0/user/profile",
        data
    })
}

// 更新用户头像
export const updateUserPhoto = (data) => {
    return request({
        method: "PATCH",
        url: "/app/v1_0/user/photo",
        data
    })
}