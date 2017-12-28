<template>
    <section>
        <h4>Topic</h4>
        <p>{{ message }}</p>
    </section>
</template>

<script>
import Common from '../../utils/common'

export default {
    name: 'Topic',

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
