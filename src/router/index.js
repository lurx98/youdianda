import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: "home",
        component: () => import('@/views/layout/home'),
        meta: {
          title: "首页"
        }
      },
      {
        path: "classify",
        component: () => import('@/views/layout/classify'),
        meta: {
          title: "分类"
        }
      },
      {
        path: "release",
        component: () => import('@/views/layout/release'),
        meta: {
          title: "发布"
        }
      },
      {
        path: "user",
        component: () => import('@/views/layout/user'),
        meta: {
          title: "我的"
        }
      },
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/reg'),
    meta: {
      title: "注册"
    }

  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      title: "登录"
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
