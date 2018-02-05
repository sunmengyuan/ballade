<template>
    <div class="gm-nodata" :style="'height: ' + height + 'px'">
        <img :src="GLOBAL.src + '/holder_' + type + '.png'">
        <p>{{ message }}</p>
    </div>
</template>

<script>
/**
 * @type
 *     common: 通用
 *     coupon: 无美券
 * @height
 *     this.GLOBAL.winHeight - 页面内容最小高度
 */
export default {
    props: {
        message: {
            type: String,
            default: '暂无相关信息'
        },
        type: {
            type: String,
            default: 'common'
        },
        height: {
            type: Number,
            default: 300
        }
    }
}
</script>

<style lang="scss" scoped>
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
