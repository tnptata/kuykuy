import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '../services/AuthService'

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
      let qs = payload.pokemon_types.map((it) => "name_in=" +it).join("&")
      let res_types = await Axios.get(api_endpoint + "/types?" +qs)
      
      let url = api_endpoint + "/monsters"
      // let user = AuthService.getUser()
      let body ={
        name:payload.name,
        name_jp:payload.name_jp,
        pokemon_types: res_types.data.map((it) => it.id),
        // user:user.id
      }
      try{
        let headers =AuthService.getApiHeader()
        let res =await Axios.post(url,body,headers)
        if(res.status === 200){
          commit("add", res.data)
          return{
            success: true,
            data: res.data
          }
        }else{
          console.err(res)
          return{
            success: false,
            message: "Unknown status code: "+ res.status
          }
        }
      }catch(e){
        if(e.response.status === 403){
          console.error(e.response.data.message)
          return{
            success: false,
            message: e.response.data.message
          }
        }else{
          return{
            success:false,
            message: "Unknown error: " + e.response.data
          }
        }
      }
      
      
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
