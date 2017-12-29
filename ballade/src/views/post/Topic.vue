<template>
    <section>
        <h4>Topic</h4>
        <p>{{ message }}</p>
        <comp message="我是日记帖"></comp>
    </section>
</template>

<script>
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
    },

    methods: {

    }
}
</script>

<style scoped>
h4 {color: green;}
</style>
