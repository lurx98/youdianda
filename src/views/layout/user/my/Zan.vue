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
                <div class="van-multi-ellipsis--l2">{{ item.description }}</div>
                <span><van-icon name="eye-o" />收藏({{ item.lovenum }})</span>
                <span><van-icon name="good-job" />点赞({{ item.click }})</span>
              </div>
            </template>
            <van-image height="100" :src="baseUrl + item.pic" />
          </van-cell>
        </van-cell-group>

        <template #right>
          <van-button
            square
            text="取消点赞"
            type="danger"
            class="delete-button"
            @click="cancelArticle(item.id)"
          />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { getUserCollectApi, cancelUserCollectApi } from '@/api/User'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      art: {
        type: 2,
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
        const { data } = await getUserCollectApi({ ...this.art })
        this.art.page++
        this.loading = false
        this.list.push(...data.data.list.data)
        console.log(data.data.list.data.length)
        if (data.data.list.data.length < 10) {
          this.finished = true
          this.art.page = 1
        }
      } catch (error) {
        console.log(error)
      }
    },
    async cancelArticle(id) {
      try {
        await cancelUserCollectApi({
          type: 2,
          article_id: id,
          action: 'del',
        })
        this.list.splice(0)
        this.art.page = 1
        await this.onLoad()
        this.$toast.success('取消收藏成功')
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

