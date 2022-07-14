<template>
  <div>
    <van-cell title="性别" is-link @click="showPicker = true">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <span>{{ value }}</span>
      </template>
    </van-cell>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      columns: ['男', '女'],
      showPicker: false,
    }
  },
  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },
  },
}
</script>

<style>
</style>
