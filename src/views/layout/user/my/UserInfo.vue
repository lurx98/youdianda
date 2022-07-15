<template>
  <div class="user-container">
    <!-- 头像  -->
    <cropper></cropper>
    <!-- 昵称 -->
    <nick-name :user-info="userInfo"></nick-name>
    <!-- 手机号 -->
    <phone-number :user-info="userInfo"></phone-number>
    <!-- 性别选择 -->
    <sex></sex>
    <!-- 出生年月 -->
    <birthday></birthday>
    <!-- 家庭住址 -->
    <my-address :user-info="userInfo"></my-address>
    <!-- 个人留言 -->
    <message :user-info="userInfo"></message>
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
import { getUserInfo } from '@/api/User'
export default {
  name: 'UserInfo',
  components: {
    Cropper,
    NickName,
    PhoneNumber,
    Sex,
    Birthday,
    MyAddress,
    Message,
  },
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    this.initInfo()
  },
  methods: {
    async initInfo() {
      try {
        const { data } = await getUserInfo()
        console.log()
        this.userInfo = data.data.userInfo
      } catch (error) {}
    },
  },
}
</script>

<style lang='less'>
</style>
