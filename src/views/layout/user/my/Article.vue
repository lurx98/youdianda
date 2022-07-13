<template>
  <div class="article">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="item in list" :key="item.id">
        <van-cell-group>
          <van-cell value="内容" center>
            <template #title>
              <div class="van-multi-ellipsis--l2">{{ item.title }}</div>
            </template>
            <template #label>
              <div>
                <div class="van-multi-ellipsis--l2">{{ item.content }}</div>
                <span><van-icon name="eye-o" />收藏({{ item.lovenum }})</span>
                <span><van-icon name="good-job" />点赞({{ item.click }})</span>
              </div>
            </template>
            <van-image height="100" :src="baseUrl + item.pic" />
          </van-cell>
        </van-cell-group>

        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
          <van-button square text="修改" type="primary" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { getUserArticleApi } from '@/api/User'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      art: {
        page: 1,
        limit: 10,
      },
    }
  },
  computed: {
    ...mapState(['baseUrl']),
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getUserArticleApi({ ...this.art })
        this.art.page++
        this.loading = false
        this.list.push(...data.data.data)
        console.log(data.data.data.length)
        if (data.data.data.length < 10) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less">
.article {
  .delete-button {
    height: 100%;
  }
  .van-cell__label {
    p {
      margin: 50px 0 0 0;
    }
  }
}
</style>>

