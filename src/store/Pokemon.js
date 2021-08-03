import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      data: []
  },
  getters: {
    pokemons: (state) => state.data,
  },
  mutations: { //private setter in java
    fetch (state, { res }){
        state.data = res.data
    },
    add(state, {payload}){
      state.data.push(payload)
    },
    edit(state, { payload }){
      state.data[payload.index].name = payload.name
      state.data[payload.index].type = payload.type
    }
  },
  actions: { //public method in oop
    async fetchPokemon ({ commit }){ //commit เป็น keyword ไว้เรียก mutation
        let res = await Axios.get(api_endpoint)
        commit('fetch',{ res })
    },
    addPokemon({ commit }, payload){
      //todo: call api to add data
      commit('add', {payload})
    },

    editPokemon({ commit }, payload){
      //tode: call api to edit data
      commit("edit", {payload})
    }
  },
  modules: {
  }
})
