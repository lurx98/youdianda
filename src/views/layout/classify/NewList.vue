<template>
  <div>
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
import { mapState } from 'vuex'
import { getClassifyNewListApi } from '@/api/Classify'
export default {
  name: 'NewList',
  props: {
    newList: {
      type: Array,
      require: true,
    },
  },
  computed: {
    ...mapState(['baseUrl']),
  },
  data() {
    return {
      queryId: this.$route.query.id,
      newArticles: [],
      loading: false,
      finished: false,
      news: {
        page: 1,
        limit: 10,
      },
    }
  },
  created() {},
  watch: {
    queryId: {
      handler() {
        console.log('ok')
        this.finished = false
        this.newArticles.splice(0)
        this.onLoad()
      },
    },
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getClassifyNewListApi({
          cateid: this.$route.query.id,
          ...this.news,
        })
        this.news.page++
        this.loading = false
        this.newArticles.push(...data.data.list.data)
        if (data.data.list.data.length < 10) {
          this.news.page = 1
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style>
</style>
