<template>
  <div>
    <van-cell title="性别" is-link @click="showPicker = true">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <span>{{ userInfo.sex == 0 ? '男' : '女' }}</span>
      </template>
    </van-cell>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        v-if="showPicker"
        :columns="columns"
        :default-index="userInfo.sex"
        @confirm="onConfirm"
        @cancel="onCancel"
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
      columns: ['男', '女'],
      defaultIndex: this.userInfo.sex,
      showPicker: false,
    }
  },
  // created() {
  //   this.$nextTick(() => {
  //     this.defaultIndex = this.userInfo.sex
  //   })
  // },
  methods: {
    async onConfirm(value, idx) {
      this.defaultIndex = idx
      this.showPicker = false
      await updateUserInfoApi({
        id: this.userInfo.id,
        sex: idx,
      })
      this.userInfo.sex = idx
    },
    onCancel() {
      this.defaultIndex = this.userInfo.sex
      this.showPicker = false
    },
  },
}
</script>

<style>
</style>
