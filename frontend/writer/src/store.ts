import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, alreadyLogin } from './api/account_api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    version: 0,
    userInfo: {
      aliasName: '张云峰',
      email: 'zhangyunfeng0101@gmail.com',
      privilege: 'admin'
    }
  },
  getters: {
    getLoginState (state) {
      console.log("store.ts getLoginState: ", state.login)
      return state.login
    }
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      let storeDataStr: string | null = localStorage.getItem('store')      
      // Replace the state object with the stored item
      if (storeDataStr) {
        let storeData: { version: number, login: boolean } = JSON.parse(storeDataStr)
        if (storeData.version !== state.version) {
          this.replaceState(Object.assign(state, storeData))
        }
      }
    },
    
    loginState (state, payload) {
      state.login = payload
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },


  actions: {
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload.userName, payload.passwd).then(response => {
          if (response.data.code === 0) {
            commit('loginState', true)
            commit('setUserInfo', response.data.data)
            resolve(response.data)
          }
        })
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('loginState', false)
          commit('setUserInfo', {})
          resolve(response.data)
        })
      })
    },

    alreadyLogin ({ commit }) {
      return new Promise((reslove, reject) => {
        alreadyLogin().then(response => {
          console.log("store.ts alreadyLogin: ", response)
          if (response.data.code === 0) {
            commit('loginState', true)
            reslove(response.data)
          } else {
            commit('loginState', false)
          }
        })
      })
    }
  }
})

export default store