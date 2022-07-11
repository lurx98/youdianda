<template>
  <van-swipe-cell>
    <van-cell-group>
      <van-cell title="单元格" value="内容" center>
        <template #label>
          <div>
            <p>111</p>
            <span><van-icon name="eye-o" />收藏()</span>
            <span><van-icon name="good-job" />点赞(7)</span>
          </div>
        </template>
        <van-image
          width="100"
          height="100"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          class="aaa"
        />
      </van-cell>
    </van-cell-group>

    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
      <van-button square text="修改" type="primary" class="delete-button" />
      <van-button square text="修改" type="primary" class="delete-button" />
      <van-button square text="修改" type="primary" class="delete-button" />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {}
</script>

<style>
</style>
