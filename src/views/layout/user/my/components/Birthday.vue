<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="$emit('close')"
  />
</template>

<script>
import { updateUserInfoApi } from '@/api/User'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 12, 1),
      currentDate: new Date(this.value.birthday),
    }
  },
  created() {},
  methods: {
    async onConfirm(value) {
      try {
        const birthday = dayjs(value).format('YYYY-MM-DD')
        this.currentDate = birthday
        this.showPicker = false
        this.$emit('input', birthday)
        await updateUserInfoApi({
          birthday,
          id: this.value.id,
        })
      } catch (error) {}

      this.$emit('close')
    },
  },
}
</script>

<style>
</style>
