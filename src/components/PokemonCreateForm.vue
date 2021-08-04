<template>
  <div>
      Add New Pokemon

      <div>
          <div>
            <label for="name">Name (En)</label>
            <input type="text" v-model="form.name.english">
          </div>

          <div>
            <label for="name_jp">Name (Jp)</label>
            <input type="text" v-model="form.name.japanese">
          </div>

          <div>
            <label for="type">Type</label>
            <input type="text" v-model = "form.type">
          </div>
          <div>
              <button @click="addPokemon">Add</button>
          </div>
      </div>
  </div>
</template>

<script>
import Pokemonstore from "@/store/Pokemon"
export default {
    data() {
        return {
            form: {
                name:{
                    english: '',
                    japanese: '' 
                },
               type:''

            }
        }
    },
    methods:{
        clearForm(){
            this.form={
                name:{
                    english: '',
                    japanese: '' 
                },
               type:''
            }
        },
        async addPokemon(){
            let payload = {
                name: this.form.name,
                type: this.form.type.split(",").map(
                    (item) => item.trim()
                )
            }
            //todo : เรียก action in Pokemonstore เพื่อเพิ่มข้อมูล
            console.log(payload)
            let res =await Pokemonstore.dispatch("addPokemon",payload)
            if(res.success){
                this.clearForm()
                this.$router.push("/pokedex")
            }else{
                this.$swal("Add Failed", res.massage, "error")
            }
            this.clearForm()
        }
    }

}
</script>

<style>

</style>