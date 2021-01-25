import axios from '../utils/axios'

/**
 * 获取用户信息
 */
export function getUserInfo(userId) {
    return axios.get('/user/getUserInfo', {
        params: {
            userId
        }
    });
}

/**
 * 登录
 */
export function login(params) {
    return axios.post('/user/login', params)
}

/**
 * 注册
 */
export function register(params) {
    return axios.post('/user/register', params)
}
