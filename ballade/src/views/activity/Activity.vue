<template>
    <section>
        <h4>活动</h4>
        <button>按钮</button>
        <p>{{ message }}</p>
        <comp></comp>
    </section>
</template>

<script>
import Echarts from 'echarts'
import Comp from '../../components/Comp'

export default {
    name: 'Activity',

    components: {
        Comp
    },

    data () {
        return {
            message: '活动'
        }
    },

    created () {
        console.log(Echarts)
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/button";
h4 {color: yellowgreen;}
</style>
