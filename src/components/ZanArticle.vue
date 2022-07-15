
<template>
  <van-loading v-if="isLodging" size="24" />
  <van-icon
    v-else
    :color="isZan ? '#0ff' : '#777'"
    :name="isZan ? 'good-job' : 'good-job-o'"
    @click="changeCollect"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { userChangeApi } from '@/api/User'
export default {
  props: {
    isZan: {
      type: Boolean,
      require: true,
    },
    articleId: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      isLodging: false,
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    async changeCollect() {
      this.isLodging = true
      if (!this.token) return this.$toast('请登录')
      try {
        if (this.isZan) {
          await userChangeApi({
            type: 2,
            article_id: this.articleId,
            action: 'del',
          })
        } else {
          await userChangeApi({
            type: 2,
            article_id: this.articleId,
            action: 'add',
          })
        }
        this.$toast.success(this.isZan ? '取消成功' : '收藏成功')
        this.$emit('update:isZan', !this.isZan)
      } catch (error) {
        console.log(error)
        this.$toast.fail('收藏失败')
      }
      this.isLodging = false
    },
  },
}
</script>

<style>
</style>
