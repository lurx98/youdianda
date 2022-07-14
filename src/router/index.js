import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {

  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch(err => err)

}
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
      {
        path: 'article',
        component: () => import('@/views/layout/user/my/Article.vue'),
        meta: {
          title: "我的文章",
          needLogin: true,
          isBack: true,
          my: true

        }
      },
      {
        path: 'save',
        component: () => import('@/views/layout/user/my/Save.vue'),
        meta: {
          title: "我的收藏",
          needLogin: true,
          isBack: true,
          my: true


        }
      },
      {
        path: 'zan',
        component: () => import('@/views/layout/user/my/Zan.vue'),
        meta: {
          title: "我的点赞",
          needLogin: true,
          isBack: true,
          my: true
        }
      },
      {
        path: 'userinfo',
        component: () => import('@/views/layout/user/my/UserInfo.vue'),
        meta: {
          title: "修改用户资料",
          needLogin: true,
          isBack: true,
          my: true
        }
      }

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
  },
  {
    path: '/list',
    component: () => import('@/views/layout/classify/List.vue'),
    meta: {
      title: '列表',
      isBack: true
    }
  }


]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin && !store.getters.token) {
    next('/login?url=' + to.path)
  } else {

    // if (to.meta.title === '列表') {
    //   console.log(to.query.id)
    //   store.state.listInfo.id = to.query.id
    // }
    next()
  }
})

export default router
