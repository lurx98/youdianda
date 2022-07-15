<template>
  <div>
    <van-cell title="昵称" is-link @click="showPopup">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <span>{{ userInfo.username }}</span>
      </template>
    </van-cell>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar title="标题">
        <template #right>
          <span @click="editUserInfo">完成</span>
        </template>
      </van-nav-bar>
      <van-field
        class="box"
        v-model="username"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
import { updateUserInfoApi } from '@/api/User'
export default {
  props: {
    userInfo: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      show: false,
      username: this.userInfo.username,
    }
  },

  methods: {
    showPopup() {
      this.show = true
      this.username = this.userInfo.username
    },
    async editUserInfo() {
      try {
        const { data } = await updateUserInfoApi({
          id: this.userInfo.id,
          username: this.username,
        })

        this.userInfo.username = this.username
        this.show = false
        this.$toast.success(data.errmsg)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
.box {
  margin-top: 20px;
}
</style>
