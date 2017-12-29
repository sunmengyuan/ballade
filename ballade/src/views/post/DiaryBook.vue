<template>
    <section>
        <h4>DiaryBook</h4>
        <p>{{ message }}</p>
    </section>
</template>

<script>
import Common from '../../utils/common'

export default {
    name: 'DiaryBook',

    data () {
        return {
            message: '日记本'
        }
    },

    created () {
        Common.main('DiaryBook')
    },

    methods: {

    }
}
</script>

<style scoped>
h4 {color: red;}
</style>
