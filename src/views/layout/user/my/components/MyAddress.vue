<template>
  <div>
    <van-cell title="家庭住址" is-link @click="showPopup">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <span>{{ address }}</span>
      </template>
    </van-cell>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar title="家庭住址">
        <template #right>
          <span>完成</span>
        </template>
      </van-nav-bar>
      <van-field
        class="box"
        v-model="address"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入家庭住址"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      address: '',
    }
  },

  methods: {
    showPopup() {
      this.show = true
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
