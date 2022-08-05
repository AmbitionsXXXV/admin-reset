import request from '@/utils/request'
/**
 * 登录请求模块
 * return promise
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * return promise
 */
export const getUserInfo = () => {
  return request({
    url: 'sys/profile'
  })
}
