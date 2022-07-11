<template>
  <div class="article">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell>
        <van-cell-group>
          <van-cell title="单元格" value="内容" center>
            <template #label>
              <div>
                <p>111</p>
                <span><van-icon name="eye-o" />收藏()</span>
                <span><van-icon name="good-job" />点赞(7)</span>
              </div>
            </template>
            <van-image
              width="100"
              height="100"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
              class="aaa"
            />
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
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      art: {
        page: 1,
        list: 10,
      },
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getUserArticleApi()
        console.log(data)
        this.finished = true
        // this.list = data.data
      } catch (error) {}
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
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

