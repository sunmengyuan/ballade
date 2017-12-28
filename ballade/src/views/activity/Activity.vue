<template>
    <section>
        <h4>活动</h4>
        <p>{{ message }}</p>
        <comp></comp>
    </section>
</template>

<script>
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

    methods: {

    }
}
</script>

<style scoped>
h4 {color: yellowgreen;}
</style>
