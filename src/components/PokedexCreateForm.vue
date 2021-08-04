<template>
  <div>
      Add New Pokemon

      <div>
          <div>
            <label for="name">Name (En)</label>
            <input type="text" v-model="form.name">
          </div>

          <div>
            <label for="name_jp">Name (Jp)</label>
            <input type="text" v-model="form.name_jp">
          </div>

          <div>
            <label for="type">Type</label>
            <input type="text" v-model = "form.pokemon_types">
          </div>
          <div>
              <button @click="addPokemon">Add</button>
          </div>
      </div>
  </div>
</template>

<script>
import PokedexApitore from "@/store/PokedexApi"
export default {
    data() {
        return {
            form: {
                name:"",
                name_jp:"",
                pokemon_types:""
            }
        }
    },
    methods:{
        clearForm(){
            this.form={
                name:"",
                name_jp:"",
                pokemon_types:""
            }
        },
        async addPokemon(){
            let payload = {
                name: this.form.name,
                name_jp: this.form.name_jp,
                pokemon_types: this.form.pokemon_types.split(",").map((item) => item.trim())
            }
            //todo : เรียก action in Pokemonstore เพื่อเพิ่มข้อมูล
            console.log(payload)
            let res = await PokedexApitore.dispatch("addPokemon",payload)
            if(res.success){
                this.clearForm()
                this.$router.push("/pokedex")
            }else{
                this.$swal("Add Failed", res.message,"error")
            }
        }
    }

}
</script>

<style>

</style>