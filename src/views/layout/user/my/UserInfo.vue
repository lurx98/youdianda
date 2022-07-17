<template>
  <div class="user-container">
    <!-- 头像  -->
    <input type="file" ref="inp" @change="inpChange" hidden />
    <!-- 个人信息 -->
    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      center
      @click="$refs.inp.click()"
    >
      <van-image
        class="avatar"
        round
        width="50"
        height="50"
        fit="cover"
        :src="baseUrl + userInfo.icon"
      />
    </van-cell>

    <!-- <cropper :user-info="userInfo"></cropper> -->
    <!-- 昵称 -->
    <nick-name :user-info="userInfo"></nick-name>
    <!-- 手机号 -->
    <phone-number :user-info="userInfo"></phone-number>
    <!-- 性别选择 -->
    <sex :user-info="userInfo"></sex>
    <!-- 出生年月 -->
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isUpdateBirthday = true"
    />
    <!-- 家庭住址 -->
    <my-address :user-info="userInfo"></my-address>
    <!-- 个人留言 -->
    <message :user-info="userInfo"></message>
    <van-popup v-model="isUpdateBirthday" round position="bottom">
      <birthday
        :value="userInfo"
        @input="userInfo.birthday = $event"
        v-if="isUpdateBirthday"
        @close="isUpdateBirthday = false"
      />
    </van-popup>
    <van-popup position="bottom" style="height: 100vh" v-model="isUpdatePhoto">
      <update-photo
        v-if="isUpdatePhoto"
        :img="imgUrl"
        :user-info="userInfo"
        @close="isUpdatePhoto = false"
        @updateImg="userInfo.icon = $event"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
// import Cropper from '@/views/layout/user/my/components/Cropper.vue'
import NickName from '@/views/layout/user/my/components/NickName.vue'
import PhoneNumber from '@/views/layout/user/my/components/PhoneNumber.vue'
import Sex from '@/views/layout/user/my/components/Sex.vue'
import Birthday from '@/views/layout/user/my/components/Birthday.vue'
import MyAddress from '@/views/layout/user/my/components/MyAddress'
import Message from '@/views/layout/user/my/components/Message.vue'
import UpdatePhoto from '@/views/layout/user/my/components/UpdatePhoto'
import { getUserInfo } from '@/api/User'
import { mapState } from 'vuex'
export default {
  name: 'UserInfo',
  components: {
    // Cropper,
    NickName,
    PhoneNumber,
    Sex,
    Birthday,
    MyAddress,
    Message,
    UpdatePhoto,
  },
  data() {
    return {
      userInfo: {},
      isUpdateBirthday: false,
      isUpdatePhoto: false,
      imgUrl: '',
    }
  },
  created() {
    this.initInfo()
  },
  computed: {
    ...mapState(['baseUrl']),
  },
  methods: {
    async initInfo() {
      try {
        const { data } = await getUserInfo()
        console.log()
        this.userInfo = data.data.userInfo
      } catch (error) {}
    },
    async inpChange() {
      const imgFile = this.$refs.inp.files[0]
      const typeArr = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
      if (!typeArr.includes(imgFile.type))
        return this.$toast.fail('文件类型不正确')
      const maxSize = 1024 * 1024 * 3
      if (imgFile.size > maxSize)
        return this.$toast.fail('文件大小不允许超过3M')
      this.imgUrl = URL.createObjectURL(imgFile)
      this.isUpdatePhoto = true
      this.$refs.inp.files = null
    },
  },
}
</script>

<style lang='less'>
</style>
