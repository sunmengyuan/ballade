<template>
    <div class="swiper-container">
        <slot></slot>
    </div>
</template>

<script>
import Swiper from '@/utils/libs/swiper'

export default {
    props: {
        opts: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    mounted () {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
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
