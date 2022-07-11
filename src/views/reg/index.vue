<template>
  <div class="login">
    <van-nav-bar
      left-arrow
      :title="$route.meta.title"
      @click-left="$router.go(-1)"
    />
    <h1 class="title">欢迎注册</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        left-icon="manager"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="user.password"
        left-icon="lock"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <van-field
        v-model="againPassword"
        left-icon="lock"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="rules.againPassword"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { regApi } from '@/api/Login.js'
export default {
  name: 'Reg',
  data() {
    return {
      user: {
        mobile: '',
        password: '',
      },
      againPassword: '',
      rules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '请填写正确手机号' },
        ],
        password: [
          { required: true, message: '请填写密码' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: '密码必须包含字母和数字',
          },
        ],
        againPassword: [
          { required: true, message: '请再次填写密码' },
          {
            validator: this.validator,
            message: '两次输出密码不一致',
          },
        ],
      },
    }
  },
  methods: {
    validator() {
      return this.user.password === this.againPassword
    },
    async onSubmit() {
      try {
        const { data } = await regApi(this.user)
        console.log(data)
        if (data.errno === 0) {
          this.$toast.success(data.errmsg)
          this.$router.replace('/login')
        } else {
          this.$toast.fail(data.errmsg)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less">
</style>
