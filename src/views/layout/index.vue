<template>
  <div class="layout">
    <van-nav-bar :title="$route.meta.title" :border="false" fixed placeholder>
      <template #right v-if="isSetting">
        <router-link to="/userinfo"><van-icon name="setting-o" /></router-link>
      </template>
      <template #left v-if="isBack">
        <div @click="back"><van-icon name="arrow-left" /></div>
      </template>
    </van-nav-bar>
    <router-view />
    <van-tabbar route fixed placeholder v-if="$route.path !== '/userinfo'">
      <van-tabbar-item replace to="/home" icon="home-o"> 首页 </van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="apps-o">
        分类
      </van-tabbar-item>
      <van-tabbar-item replace to="/release" icon="edit">
        发布
      </van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-circle-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    isSetting() {
      return this.user && this.$route.path === '/user'
    },
    isBack() {
      return this.$route.meta.isBack
    },
  },
  methods: {
    back() {
      if (this.$route.meta.my) {
        this.$router.push('/user')
      } else {
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style lang="less">
</style>

