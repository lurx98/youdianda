<template>
  <div>
    <van-cell title="手机号" is-link @click="showPopup">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <span>{{ phone }}</span>
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
          <span>完成</span>
        </template>
      </van-nav-bar>
      <van-field
        class="box"
        v-model="phone"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
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
      phone: '',
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
