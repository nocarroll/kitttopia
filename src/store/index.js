import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/samples.api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bankLength: 9,
    banks: [],
    bank: 1,
    lastPlayed: null,
    error: false,
    loaded: false
  },
  mutations: {
    'UPDATE_SAMPLE_BANKS' (state, payload) {
      state.banks = payload
    },
    'SET_INIT_LOAD' (state, payload) {
      state.loaded = payload
    },
    'SET_API_ERROR' (state, payload) {
      state.error = payload
    },
    'SET_LAST_PLAYED' (state, payload) {
      state.lastPlayed = payload
    },
    'SET_CURRENT_BANK' (state, payload) {
      state.bank = payload
    }
  },
  actions: {
    getSamples ({ commit }) {
      api.scrape().then(data => {
        commit('UPDATE_SAMPLE_BANKS', data)
        commit('SET_INIT_LOAD', true)
      })
      .catch(e => {
        commit('SET_API_ERROR', true)
        commit('SET_INIT_LOAD', true)
      })
    },
    setSampleInfo ({ commit }, payload) {
      commit('SET_LAST_PLAYED', payload)
    },
    setCurrentBank ({ commit }, payload) {
      commit('SET_CURRENT_BANK', payload)
    }
  }
})
