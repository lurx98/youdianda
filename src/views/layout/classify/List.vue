<template>
  <div class="list-container">
    <van-nav-bar :title="$route.meta.title" fixed placeholder>
      <template #left>
        <router-link to="/classify"><van-icon name="arrow-left" /></router-link>
      </template>
    </van-nav-bar>

    <van-tabs v-model="listInfo.id" @click="sendId" swipeable>
      <van-tab
        v-for="item in classifyList"
        :name="item.id"
        :key="item.id"
        :title="item.catename"
        :to="{
          path: '/list',
          query: {
            id: item.id,
          },
        }"
      >
        <new-list ></new-list>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import { getHomeIndexApi } from '@/api/Home'
import { getClassifyNewListApi } from '@/api/Classify'

import NewList from '@/views/layout/classify/NewList.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { NewList },
  data() {
    return {
      active: 9,
      classifyList: [],
      newArticles: [],
    }
  },
  computed: {
    ...mapState(['listInfo']),
  },
  methods: {
    ...mapMutations(['setIndex']),
    async initClassify() {
      try {
        const { data } = await getHomeIndexApi()
        this.classifyList = data.data.allCate
      } catch (error) {}
    },
    sendId(name) {
      console.log('ok')
    },
  },
  mounted() {
    this.initClassify()
    console.log(this.$route.query.id)
    // this.setIndex({
    //   id: this.$route.query.id,
    // })
  },
}
</script>

<style lang='less'>
.list-container {
  .van-nav-bar {
    background-color: #fff !important;
  }
  .van-icon-arrow-left,
  .van-nav-bar__title {
    color: #1b8afa !important;
  }
}
</style>
