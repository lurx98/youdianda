<template>
  <div class="home-container">
    <van-swipe :autoplay="3000" width="100%" height="170">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="baseUrl + image.advimgsrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      text="技术是开发它的人的共同灵魂。"
    />
    <!-- 单元格 -->
    <van-cell-group class="title">
      <van-cell title="热门推荐" />
    </van-cell-group>
    <van-grid :gutter="10" :column-num="3" class="hot-articles">
      <van-grid-item
        v-for="item in hotArticles"
        :key="item.id"
        :to="{
          path: '/details',
          query: {
            id: item.id,
          },
        }"
      >
        <van-image width="90" height="90" :src="baseUrl + item.pic" />
        <span class="van-multi-ellipsis--l2">{{ item.title }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group class="title">
      <van-cell title="最近更新" />
    </van-cell-group>
    <!-- 新闻列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          value="内容"
          center
          v-for="item in newArticles"
          :key="item.id"
          :to="{
            path: '/details',
            query: {
              id: item.id,
            },
          }"
        >
          <template #title>
            <div class="van-multi-ellipsis--l2">{{ item.title }}</div>
          </template>
          <template #label>
            <div>
              <div class="van-multi-ellipsis--l2">{{ item.description }}</div>
              <span><van-icon name="eye-o" />收藏({{ item.lovenum }})</span>
              <span><van-icon name="good-job" />点赞({{ item.click }})</span>
            </div>
          </template>
          <van-image height="100" :src="baseUrl + item.pic" class="aaa" />
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import {
  getHomeIndexApi,
  getHotArticlesApi,
  getNewArticlesApi,
} from '@/api/Home'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      banner: [],
      hotArticles: [],
      newArticles: [],
      loading: false,
      finished: false,
      new: {
        page: 1,
        limit: 10,
      },
    }
  },
  computed: {
    ...mapState(['baseUrl']),
  },

  methods: {
    async initHomeIndex() {
      try {
        const { data } = await getHomeIndexApi()
        const hot = await getHotArticlesApi()
        this.banner = data.data.banner
        this.hotArticles = hot.data.data.list
      } catch (error) {}
    },
    async onLoad() {
      try {
        const { data } = await getNewArticlesApi({ ...this.new })
        this.new.page++
        this.loading = false
        this.newArticles.push(...data.data.list.data)
        if (data.data.list.data.length < 10) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.initHomeIndex()
  },
}
</script>

<style lang="less">
.home-container {
  .van-swipe {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    span {
      color: #2690fa;
      font-weight: 700;
    }
  }
  .hot-articles {
    span {
      font-size: 12px;
    }
  }
}
</style>

