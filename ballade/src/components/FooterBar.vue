<template>
    <div class="gm-footer" :style="{paddingBottom: pdBtom}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pdBtom: 0
        }
    },

    created () {
        var model = decodeURIComponent(this.$router.query('model'))
        if (model === 'iPhone X') this.pdBtom = '18px'
    }
}
</script>

<style lang="scss" scoped>
.gm-footer {
    @extend %gm-footer;
}
</style>
