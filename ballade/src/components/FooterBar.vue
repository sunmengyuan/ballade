<template>
    <div class="gm-footer" :style="{paddingBottom: paddingBottom}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data () {
        return {
            paddingBottom: 0
        }
    },

    created () {
        var model = decodeURIComponent(this.$router.query('model'))
        if (model === 'iPhone X') this.paddingBottom = '18px'
    }
}
</script>

<style lang="scss" scoped>
.gm-footer {
    @extend %gm-footer;
}
</style>
