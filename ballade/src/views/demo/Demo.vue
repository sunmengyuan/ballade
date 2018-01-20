<template></template>

<script>
import Loadmore from '@/utils/loadmore'

export default {
    name: 'Demo',

    data () {
        return {

        }
    },

    created () {
        Loadmore.do(this, {
            url: '/hybrid/topic_reply/19227490/',
            callbackFn: (data) => {
                console.log(data)
            },
            completeFn: () => {
                console.log('完成')
            }
        })
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>
