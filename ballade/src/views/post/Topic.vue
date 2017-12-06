<template>
    <section>
        <h4>Topic</h4>
        <p>{{ message }}</p>
    </section>
</template>

<script>
export default {
    name: 'Topic',

    data () {
        return {
            message: '日记帖'
        }
    },

    methods: {

    }
}
</script>

<style scoped>
h4 {color: green;}
</style>
