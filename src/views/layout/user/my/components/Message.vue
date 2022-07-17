<template>
  <div>
    <van-cell
      title="家庭住址"
      is-link
      @click="showPopup"
      :label="userInfo.notes"
    >
      <!-- 使用 title 插槽来自定义标题 -->
    </van-cell>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar title="个人留言">
        <template #right>
          <span @click="editUserInfo">完成</span>
        </template>
      </van-nav-bar>
      <van-field
        class="box"
        v-model="notes"
        rows="2"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="请输入个人留言"
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
      notes: this.userInfo.notes,
    }
  },

  methods: {
    showPopup() {
      this.show = true
      this.notes = this.userInfo.notes
    },
    async editUserInfo() {
      try {
        const { data } = await updateUserInfoApi({
          id: this.userInfo.id,
          notes: this.notes,
        })

        this.userInfo.notes = this.notes
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
