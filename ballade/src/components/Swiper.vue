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
    mounted () {
        /* eslint-disable no-new */
        new window.Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            observer: true,
            observeParents: true
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/swiper.css";
</style>
