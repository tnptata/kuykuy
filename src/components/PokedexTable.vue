<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name (EN)</th>
                    <th>Name (JP)</th>
                    <th>Type</th>
                    <th v-if="isAuthen()">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(poke, index) in pokemons" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-if="index !== editIndex">{{ poke.name }}</td>
                    <td v-if="index === editIndex">
                        <input type="text" v-model="form.name">
                    </td>
                    
                    <td v-if="index !== editIndex">{{ poke.name_jp }}</td>
                    <td v-if="index === editIndex">
                        <input type="text" v-model="form.name_jp">
                    </td>
                    <td v-if="index !== editIndex">{{ poke.pokemon_types.map(it => it.name).join(', ') }}</td>
                    <td v-if="index === editIndex">
                        <input type="text" v-model="form.pokemon_types">
                    </td>
                    <td v-if="isAuthen()">
                        <router-link :to="{name: 'PokedexEdit', params: {id: poke.id}}">Edit</router-link>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import PokedexApiStore from '@/store/PokedexApi'
    import AuthUser from '@/store/AuthUser'
    export default{
        data() {
            return {
                pokemons: [], //List เอาไว้แสดง
                //สำหรับฟอร์มแก้ไข
                editIndex:-1,
                form:{
                    id:"",
                    name:"",
                    name_jp:"",
                    pokemon_types:""
                }

            }
        },
        created(){
            this.fetchPokemon()
        },
        methods: {
            isAuthen(){
                return AuthUser.getters.isAuthen
            },
            arraToString(arr){
                return arr
            },
            async fetchPokemon(){
                //  เรียก action in store ใช้ dispatch
                await PokedexApiStore.dispatch('fetchPokemon')

                //เรียก getter in store
                this.pokemons = PokedexApiStore.getters.pokemons
            },
            openForm(index, pokemon){
                console.log('index', index);
                console.log('pokemon', pokemon);
                this.editIndex = index
                let cloned = JSON.parse(JSON.stringify(pokemon))
                this.form.id = cloned.id
                this.form.name = cloned.name
                this.form.name_jp = cloned.name_jp
                this.form.pokemon_types = cloned.pokemon_types.map(it => it.name).join(', ')
            },
            closeForm(){
                this.editIndex= -1
                this.form={
                    id:"",
                    name:"",
                    name_jp:"",
                    pokemon_types:""
                }
            },
            async editPokemon(){
                let payload = {
                    index:this.editIndex,
                    id: this.form.id,
                    name: this.form.name,
                    name_jp: this.form.name_jp,
                    pokemon_types: this.form.pokemon_types.split(",").map((item) => item.trim()),
                }
                console.log(payload);
                await PokedexApiStore.dispatch('editPokemon',payload)
                this.closeForm()
                this.fetchPokemon()
            }
        }
    }
</script>

<style>

</style>
