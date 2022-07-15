<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="stateCode === 1">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="stateCode === 2">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="baseUrl + articleInfo.pic"
          />
          <div slot="title" class="user-name">{{ articleInfo.author }}</div>
          <div slot="label" class="publish-date">14小时前</div>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleInfo.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <van-cell-group class="title">
          <van-cell title="热门推荐" />
        </van-cell-group>
        <van-grid :gutter="10" :column-num="2" class="hot-articles">
          <van-grid-item
            v-for="item in recommendList"
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

        <!-- 底部区域 -->
        <div class="article-bottom">
          <collect-article
            :is-collect.sync="articleInfo.isCollect"
            :article-id="queryId"
          />
          <zan-article
            :is-zan.sync="articleInfo.isLike"
            :article-id="queryId"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="stateCode === 3">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="stateCode === 4">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { showArticleApi } from '@/api/Release'
import { mapState } from 'vuex'
import CollectArticle from '@/components/CollectArticle.vue'
import ZanArticle from '@/components/ZanArticle.vue'
export default {
  name: 'ArticleIndex',
  components: { CollectArticle, ZanArticle },

  data() {
    return {
      queryId: this.$route.query.id,
      articleInfo: {},
      recommendList: [],
      stateCode: 1,
    }
  },
  computed: {
    ...mapState(['baseUrl']),
  },
  watch: {},
  created() {
    this.initData()
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.$router.go(0)
      },
    },
  },
  methods: {
    async initData() {
      try {
        const { data } = await showArticleApi({
          id: this.queryId,
        })
        this.articleInfo = data.data.info
        this.recommendList = data.data.recommend
        this.stateCode = 2
      } catch (error) {
        console.log(error)
        if (error.response.status === 500) {
          this.stateCode = 3
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
@import url('@/styles/github-markdown.css');
.article-container {
  .hot-articles {
    span {
      font-size: 12px;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
