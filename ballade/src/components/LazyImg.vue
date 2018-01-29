<template>
    <div class="gm-lazyimg" :style="'padding-bottom: ' + 100 * ratio + '%'">
        <span>更美</span>
        <img :src="src" />
    </div>
</template>

<script>
export default {
    props: {
        ratio: {
            type: Number,
            default: 0.4
        },
        src: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.gm-lazyimg {
    position: relative;
    z-index: 0;
    display: inline-block;
    font-size: 0;
    background-color: #F7F7F7;
    overflow: hidden;
    span {
        position: absolute;
        z-index: -1;
        font-size: 1.41rem;
        color: #E7E7E7;
        text-shadow: 0 2px 2px #FFF;
        @extend %gm-center;
    }
}
</style>
