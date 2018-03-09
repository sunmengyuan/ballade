<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import '@/utils/swiper'

export default {
    props: {
        opts: {
            type: Object,
            default: {}
        }
    },

    mounted () {
        /* eslint-disable no-new */
        new window.Swiper('.swiper-container', {
            ...this.opts,
            observer: true,
            observeParents: true
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/swiper.css";
</style>
