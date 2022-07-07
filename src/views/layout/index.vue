<template>
  <div class="layout">
    <van-nav-bar :title="$route.meta.title" />
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"> 标签 </van-tabbar-item>
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
export default {}
</script>

<style lang="less">
</style>

