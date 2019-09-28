import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, alreadyLogin } from './api/account_api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    version: 0
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
    }
  },


  actions: {
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload.userName, payload.passwd).then(response => {
          if (response.data.code === 0) {
            commit('loginState', true)
            resolve(response.data)
          }
        })
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('loginState', false)
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

// Subscribe to store updates
// store.subscribe((mutation, state) => {
//   // Store the state object as a JSON string
//   let store = {
//     version: state.version,
//     login: state.login
//   }
// 	localStorage.setItem('store', JSON.stringify(store))
// })

export default store