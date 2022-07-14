<template>
  <div class="user-container">
    <!-- 头像  -->
    <cropper></cropper>
    <!-- 昵称 -->
    <nick-name></nick-name>
    <!-- 手机号 -->
    <phone-number></phone-number>
    <!-- 性别选择 -->
    <sex></sex>
    <!-- 出生年月 -->
    <birthday></birthday>
    <!-- 家庭住址 -->
    <my-address></my-address>
    <!-- 个人留言 -->
    <message></message>
  </div>
</template>

<script>
import Cropper from '@/views/layout/user/my/components/Cropper.vue'
import NickName from '@/views/layout/user/my/components/NickName.vue'
import PhoneNumber from '@/views/layout/user/my/components/PhoneNumber.vue'
import Sex from '@/views/layout/user/my/components/Sex.vue'
import Birthday from '@/views/layout/user/my/components/Birthday.vue'
import MyAddress from '@/views/layout/user/my/components/MyAddress'
import Message from '@/views/layout/user/my/components/Message.vue'
export default {
  components: {
    Cropper,
    NickName,
    PhoneNumber,
    Sex,
    Birthday,
    MyAddress,
    Message,
  },
  methods: {
    // 返回 Promise
    beforeRead(file) {
      console.log(file)
      if (file.type !== 'image/jpeg') {
        return false
      }
      return true
    },
  },
}
</script>

<style lang='less'>
</style>
