<template>
  <div class="login-page">
    <el-card>
      <h2 style="font-weight: 700; color: #2c80ff; margin-bottom: 20px;">登录</h2>
      <el-form v-model="form">
        <el-form-item
          prop="userName">
          <el-input placeholder="用户名" v-model="form.userName"></el-input>
        </el-form-item>

        <el-form-item
          prop="passwd">
          <el-input placeholder="密码" v-model="form.passwd" type="password" show-password></el-input>
        </el-form-item>

      </el-form>

      <el-button
        style="border-radius: 0;background: #2c80ff;"
        type="primary"
        @click="onLoginButtonClick">登录</el-button>
    </el-card>
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
