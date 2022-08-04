// 封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // 添加icode
    config.headers.icode = '9F6B0F898A0AAFF5'
    // 必须返回 config
    return config
  }
)

service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败（请求成功，业务失败）,消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
