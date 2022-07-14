<template>
  <div>
    <van-cell title="生日" is-link @click="showPicker = true">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <span>{{ currentDate }}</span>
      </template>
    </van-cell>
    <van-popup v-model="showPicker" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
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
      currentDate: '',
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 12, 1),
      currentDate: new Date(1998, 0, 17),
    }
  },
  created() {},
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
