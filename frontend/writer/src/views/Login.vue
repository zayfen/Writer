<template>
  <div class="login-page">
    <el-form v-model="form">
      <el-form-item
        label="用户名"
        prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="passwd">
        <el-input v-model="form.passwd" type="password" show-password></el-input>
      </el-form-item>

    </el-form>

    <el-button type="primary" @click="onLoginButtonClick">登录</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface LoginForm {
  userName: string,
  passwd: string
}

@Component
export default class Login extends Vue {

  form: LoginForm = { userName: '', passwd: '' }

  public beforeCreate () {
    this.$store.dispatch('alreadyLogin').then(res => {
      this.$router.replace({ name: 'home' })
    })
  }

  public onLoginButtonClick () {

    this.$store.dispatch('login', this.form).then(res => {
      if (res.code === 0) {
        this.$router.replace({ name: 'home' })
      } else {
        this.$notify.error(res.message || '登录失败')
      }
    })
  }

}
</script>

<style lang="less">
  .login-page {
    position: absolute;
    display: block;
    width: 30%;
    height: 30%;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>