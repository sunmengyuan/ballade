<template>
    <section>
        <h4>DiaryBook</h4>
        <button>按钮</button>
        <p>{{ message }}</p>
    </section>
</template>

<script>
import Module from '../../utils/module'

export default {
    name: 'DiaryBook',

    data () {
        return {
            message: '日记本'
        }
    },

    created () {
        Module.main('DiaryBook')
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
h4 {
    color: red;
}
</style>
