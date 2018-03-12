<template>
    <div class="gm-nodata" :style="'height: ' + height + 'px'">
        <span class="img" :class="type"></span>
        <p>{{ message }}</p>
    </div>
</template>

<script>
/**
 * @type
 *     common: 通用
 *     coupon: 无美券
 *     comment: 无评论
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
            default: 250
        }
    }
}
</script>

<style lang="scss" scoped>
$holderType: common, coupon, comment;

.gm-nodata {
    position: relative;
    width: 100%;
    min-height: 5rem;
    text-align: center;
    background-color: #FFF;
    .img, p {
        position: absolute;
        @extend %gm-center;
    }
    .img {
        display: inline-block;
        width: 3.49rem;
        height: 3.96rem;
        background: transparent no-repeat 50% 0;
        background-size: 3.49rem auto;
        @each $type in $holderType {
            &.#{$type} {
                background-image: url("../assets/imgs/holder_#{$type}.png");
            }
        }
        &.comment {
            height: 2.5rem;
            background-size: 1.6rem auto;
            & + p {
                font-size: .26rem;
                color: $fClrWeaker;
                margin-top: 0.7rem;
            }
        }
    }
    p {
        font-size: 0.3rem;
        line-height: 0.4rem;
        color: $fClrWeak;
        margin-top: 1.5rem;
    }
}
</style>
