
<template>
  <van-loading v-if="isLodging" size="24" />
  <van-icon
    v-else
    :color="isCollect ? '#0ff' : '#777'"
    :name="isCollect ? 'star' : 'star-o'"
    @click="changeCollect"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { userChangeApi } from '@/api/User'
export default {
  props: {
    isCollect: {
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
        if (this.isCollect) {
          await userChangeApi({
            type: 1,
            article_id: this.articleId,
            action: 'del',
          })
        } else {
          await userChangeApi({
            type: 1,
            article_id: this.articleId,
            action: 'add',
          })
        }
        this.$toast.success(this.isCollect ? '取消成功' : '收藏成功')
        this.$emit('update:isCollect', !this.isCollect)
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
