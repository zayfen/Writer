<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">我的文章</router-link> |
      <router-link to="/publish">发布新文章</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}
#nav {
  padding-bottom: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #2c80ff;
    }
  }
}
</style>
