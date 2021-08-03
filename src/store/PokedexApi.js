import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = process.env.VUE_APP_POKEMON_ENDPOINT || "http://localhost:3000"
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
    edit(state, payload ){
      state.data[payload.index] = payload
      // state.data[payload.index].type = payload.pokemon_types.map(it => {name:it})
    }
  },
  actions: { //public method in oop
    async fetchPokemon ({ commit }){ //commit เป็น keyword ไว้เรียก mutation
        let res = await Axios.get(api_endpoint + "/monsters")
        console.log(res);
        commit('fetch',{ res })
    },
    async addPokemon({ commit }, payload){
      let url = api_endpoint + "/monsters"
      let body = {
        name : payload.name,
        name_jp: payload.name_jp,
      }
      // type_ids = []
      // for(let type of payload.pokemon_types){
      //   let types = await Axios.get(api_endpoint+ "/types?name=" +type)
      //   type_ids.push(types.data.id)
      // }
      

      // console.log(payload.pokemon_types)
      let res = await Axios.post(url, body)
      //todo: call api to add data
      let data = res.data
      commit('add', data)
    },

    async editPokemon({ commit }, payload){
      let url = api_endpoint + "/monsters/" + payload.id
      let body = {
        name : payload.name,
        name_jp: payload.name_jp,
      }
      let res = await Axios.put(url, body)
      console.log(res);
      if(res.status === 200){
        let data = res.data
        data.index = payload.index

      }else{
        console.err(res)
      }
      commit("edit", {payload})
    }
  },
  modules: {
  }
})
