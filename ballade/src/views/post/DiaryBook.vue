<template>
    <section>
        <h4>DiaryBook</h4>
        <p>{{ message }}</p>
    </section>
</template>

<script>
    export default {
        name: 'DiaryBook',

        data () {
            return {
                message: '日记本'
            }
        },

        methods: {

        }
    }
</script>

<style scoped>
h4 {color: rebeccapurple;}
</style>
