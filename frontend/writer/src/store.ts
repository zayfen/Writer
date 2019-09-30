import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, alreadyLogin } from './api/account_api'
import { saveSessionStorage } from '@/utils/storage_utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    userInfo: {
      aliasName: 'Unknown',
      email: 'zhangyunfeng0101@gmail.com',
      privilege: 'read'
    }
  },
  getters: {
    getLoginState (state) {
      console.log("store.ts getLoginState: ", state.login)
      return state.login
    }
  },
  mutations: {
    loadInitState (state, payload: { login: boolean, userInfo: any }) {
      state.login = !!payload.login
      state.userInfo = payload.userInfo
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
            saveSessionStorage('WRITER-STATE', { login: true, userInfo: response.data.data })
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
          saveSessionStorage('WRITER-STATE', {login: false, userInfo: {}})
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
            commit('setUserInfo', response.data.data)
            saveSessionStorage('WRITER-STATE', { login: true, userInfo: response.data.data })
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
