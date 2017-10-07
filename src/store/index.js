import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/samples.api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bankLength: 9,
    banks: []
  },
  mutations: {
    'UPDATE_SAMPLE_BANKS' (state, payload) {
      state.banks = payload
    }
  },
  actions: {
    getSamples ({commit}) {
      api.scrape().then(data => {
        commit('UPDATE_SAMPLE_BANKS', data)
      })
    }
  }
})
