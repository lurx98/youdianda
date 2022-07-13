<template>
  <div>
    <van-empty v-if="!token" image="error" description="请登录" />
    <release-article v-else></release-article>
  </div>
</template>

<script>
import ReleaseArticle from '@/views/layout/release/ReleaseArticle.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Release',
  components: {
    ReleaseArticle,
  },
  computed: {
    ...mapGetters(['token']),
  },
}
</script>

<style>
</style>
