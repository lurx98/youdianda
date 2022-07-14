<template>
  <div class="user-container">
    <div class="no-login" v-if="!user">
      <router-link to="/login">
        <div class="base-info">
          <div class="left">
            <van-image
              round
              fit="cover"
              width="75px"
              height="75px"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="title">
              <h1>请登录</h1>
              <p>登录之后更加精彩</p>
            </div>
          </div>
          <p></p>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
      </router-link>
    </div>
    <div class="login" v-else>
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            width="75px"
            height="75px"
            :src="baseUrl + userInfo.icon"
          />
          <div class="title">
            <h1>{{ userInfo.username }}</h1>
          </div>
        </div>
        <p></p>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
      <van-grid :column-num="3" clickable>
        <van-grid-item icon="like-o" text="收藏" to="/save" />
        <van-grid-item icon="good-job-o" text="点赞" to="/zan" />
        <van-grid-item icon="newspaper-o" text="文章" to="/article" />
      </van-grid>
    </div>
    <van-cell icon="newspaper-o" title="我的文章" is-link to="/article" />
    <van-cell icon="good-job-o" title="我的收藏" is-link to="/save" />
    <van-cell icon="like-o" title="我的点赞" is-link to="/zan" />
    <van-button type="info" size="large" @click="quit" v-if="user"
      >退出登入</van-button
    >
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { getUserInfo } from '@/api/User'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    if (this.user) this.initInfo()
  },
  methods: {
    ...mapMutations(['setUser']),
    async initInfo() {
      try {
        const { data } = await getUserInfo()
        console.log()
        this.userInfo = data.data.userInfo
      } catch (error) {}
    },
    async quit() {
      try {
        await this.$dialog.confirm({
          title: '确认退出吗',
        })
        this.setUser('')
      } catch (error) {}
    },
  },
  computed: {
    ...mapGetters(['token']),
    ...mapState(['user', 'baseUrl']),
  },
}
</script>

<style lang='less'>
.user-container {
  .base-info {
    width: 100%;
    height: 230px;
    padding: 24px 32px;
    background-color: #1989fa;
    display: flex;
    justify-content: space-between;
    align-self: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .title {
        margin-left: 25px;
        color: #fff;
        h1 {
          font-size: 30px;
        }
        p {
          font-size: 12px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .van-icon-arrow {
        color: #fff;
      }
    }
  }
}
</style>
