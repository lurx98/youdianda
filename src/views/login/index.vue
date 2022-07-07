<template>
  <div class="login">
    <van-nav-bar
      left-arrow
      :title="$route.meta.title"
      @click-left="$router.go(-1)"
    />
    <h1 class="title">优点达资讯</h1>
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-row>
      <van-col span="8"
        ><router-link to="/reg">没有账户,去注册</router-link></van-col
      >
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '',
        password: '',
      },
      rules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '请填写正确手机号' },
        ],
        password: [
          { required: true, message: '请填写密码' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: '请填写正确密码',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    },
  },
}
</script>

<style lang="less">
.login {
  .van-col--8 {
    float: right;
    a {
      font-size: 12px;
    }
  }
}
</style>
