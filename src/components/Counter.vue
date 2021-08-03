<template>
    <div class="mb-20">
        Counter: {{ number }}
        <div>
            <label for="center" v-bind:title="number">Counter: </label>
            <input type="text" v-model="number" />
            <button v-on:click="increase(1)">+</button>
            <button v-on:click="increase(-1)">-</button>
            <button v-on:click="increase(number)">x2</button>
            <button v-on:click="increase(10)">+10</button>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            number: this.initNumber || 10
        }
    },
    props:['initNumber'],
    methods: {
        increase(n){
            this.number += n;
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mb-20{
    margin-bottom: 20px;
}
</style>