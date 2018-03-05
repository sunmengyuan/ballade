<template>

</template>

<script>
export default {
    props: {
        data: {
            type: String,
            default: ''
        }
    },

    created () {
        console.log(this.data)
    }
}
</script>

<style lang="scss" scoped>

</style>
