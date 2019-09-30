<template>
  <div id="app">
    <div id="nav" v-if="this.$store.state.login">
      <el-container>
        <el-header style="text-align: right; font-size: 14px;font-weight: 700; padding: 0 200px 0 200px; color: #000;">

          <el-row>
            <el-col :span="12" style="text-align: left">
              <router-link class="router-link" to="/">我的文章</router-link>
              <router-link class="router-link" to="/publish">发布新文章</router-link>              
            </el-col>
            <el-col :span="12">
              <el-dropdown @command="handleCommand">
                <i class="el-icon-arrow-down" style="margin-right: 10px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>{{this.$store.state.userInfo.aliasName}}</span>
            </el-col>
          </el-row>
        </el-header>
      </el-container>
    </div>
    <router-view />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { logout } from '@/api/account_api'
@Component
export default class App extends Vue {

  public created() {
  }

  public handleCommand (command: string) {
    if (command === 'logout') {
      this.handleLogoutCommand()
    }

  }

  public handleLogoutCommand () {
    this.$store.dispatch('logout').then(response => {
      if (response.code === 0) {
        this.$notify.success('登出成功，将跳转到登录页面。。。')
        setTimeout(() => {
          this.$router.push({
            name: 'login'
          })
        }, 1000)
      } else {
        this.$notify.error('登出失败，请稍后再试')
      }
    })
  }

}
</script>


<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  min-width: 1300px;
  overflow-x: hidden;
  font-family: "Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  min-width: 1300px;
}
#nav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 0;
  padding: 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 2px #9da5ab;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #2c80ff;
    }
  }

  .router-link {
    display: inline-block;
    width: 80px;
    height: 40px;
    margin-right: 10px;
    line-height: 40px;

    text-align: center;
    text-decoration: none;
    color: #3e3e3e;

    &:hover {
      color: #2c80ff;
      background: #eee;
    }
  }
}
</style>
