<template>
    <div>
        <h1>Number List</h1>
        <p>Sample Counter Components</p>
        <counter init-number=0></counter>
        <counter init-number=100></counter>
        <counter init-number=-10></counter>
        <counter ></counter>
    </div>
</template>

<script>
import Counter from '@/components/Counter.vue';
export default{
    name:'NumberList',
    components:{
        Counter
    }
}
</script>

<style lang="scss" scoped>

</style>
