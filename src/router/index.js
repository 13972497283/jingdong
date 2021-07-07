import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home'
// 引入一个Home组件，这个组件是home目录下的Home.vue组件
import Login from '../views/login/Login'
// import Shop from '../views/shop/Shop'
import Register from '../views/register/Register'
const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home// 这里的组件要与import进来的组件同名
    component: () => import(/* webpackChunkName: "home" */'../views/home/Home')
    // 利用异步组件减小内存开销，访问哪个页面就加载哪个页面，防止访问登录页面时而加载首页及其他页面，造成内存开销
  },
  {
    path: '/shop/:id', // 进入shop页面时路由要跟店铺对应的id
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter (to, from, next) { // 进入注册页面之前做的校验
      const isLogin = localStorage.isLogin// 拿到登录状态
      if (isLogin) { // 如果已经登录，那么就不能再跳到注册页面
        next({ name: 'Home' })// 那下一步就需要跳到home页面
      } else {
        next()// 如果没有登录，那么就正常执行下一步（根据指示跳转）
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) { // 进入登录页面之前做的校验
      const isLogin = localStorage.isLogin// 拿到登录状态
      if (isLogin) { // 如果已经登录，那么就不能再跳到登录页面
        next({ name: 'Home' })// 那下一步就需要跳到home页面
      } else {
        next()// 如果没有登录，那么就正常执行下一步（根据指示跳转）
      }
    }
  }
  // 路由的作用就是使APPVue根据路径的不同展示不同的组件
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin// 拿到登录状态
  if (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) { // 每个组件跳转前都做个校验如果没有登录并且将要跳转的页面不是Login也不是Register那么就跳转到登录界面
    next({ name: 'Login' })
  } else { // 否则下一步正常执行
    next()
  }
  next()
})
export default router
