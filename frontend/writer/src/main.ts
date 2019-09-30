import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/typo.css'
import { saveSessionStorage, loadSessionStorage } from '@/utils/storage_utils'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    let state = loadSessionStorage('WRITER-STATE')
    console.log("beforeCreate")
    this.$store.dispatch('loadInitState', state)
  }
}).$mount('#app')
