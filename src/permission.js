// 功能描述
// 当用户未登陆时，不允许进入除 login 之外的其他页面。
// 用户登录后，token 未过期之前，不允许进入 login 页面
import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 初始位置
 * @param {*} next 是否跳转
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token(用户已登录) ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token的情况下(用户未登录)，只可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
