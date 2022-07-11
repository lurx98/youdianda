<template>
  <div>
    <van-grid :column-num="2">
      <van-grid-item
        v-for="(item, index) in classifyList"
        :key="item.id"
        icon-prefix="fa"
        :icon="item.icon.slice(3)"
        :text="item.catename"
        @click="goList(item.id, index)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getHomeIndexApi } from '@/api/Home'
import { mapMutations } from 'vuex'
export default {
  name: 'Classify',
  data() {
    return {
      classifyList: [],
    }
  },
  methods: {
    ...mapMutations(['setIndex']),
    async initClassify() {
      try {
        const { data } = await getHomeIndexApi()
        this.classifyList = data.data.allCate
      } catch (error) {}
    },
    goList(id, index) {
      this.$router.push({
        path: '/list',
        query: {
          id,
          index,
        },
      })
      this.setIndex({
        id,
        index,
      })
    },
  },
  created() {
    this.initClassify()
  },
}
</script>

<style>
</style>
