<template>
    <section>
        <h4>Topic</h4>
        <button>按钮</button>
        <p>{{ message }}</p>
        <comp message="我是日记帖"></comp>
    </section>
</template>

<script>
import Echarts from 'echarts'
import Common from '../../utils/common'
import Comp from '../../components/Comp'

export default {
    name: 'Topic',

    components: {
        Comp
    },

    data () {
        return {
            message: '日记帖'
        }
    },

    created () {
        Common.main()
        console.log(Echarts)
    },

    methods: {

    }
}
</script>

<style scoped>
h4 {color: green;}
</style>
