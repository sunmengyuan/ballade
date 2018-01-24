<template>
    <section class="gm-nodata">
        <img :src="GLOBAL.src + '/holder_' + type + '.png'">
        <p>{{ message }}</p>
    </section>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: '暂无相关信息'
        },
        type: {
            type: String,
            default: 'common'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vars";
@import "../assets/mixins";

.gm-nodata {
    position: relative;
    width: 100%;
    min-height: 6rem;
    text-align: center;
    background-color: #FFF;
    img, p {
        position: absolute;
        @extend %gm-center;
    }
    img {
        width: 3.49rem;
    }
    p {
        font-size: 0.3rem;
        line-height: 0.4rem;
        color: $fClrWeak;
        margin-top: 1.5rem;
    }
}
</style>
