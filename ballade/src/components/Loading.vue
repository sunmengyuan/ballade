<template>
    <div class="gm-loading">
        <div class="loading" v-if="loading">正在加载...</div>
        <div class="complete" v-else>我们是有底线的</div>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
.gm-loading {
    font-size: 0.26rem;
    line-height: 0.4rem;
    text-align: center;
    color: $fClrWeaker;
    margin: 0.5rem 0.8rem;
    overflow: hidden;
    .complete {
        position: relative;
        &:before, &:after {
            content: "";
            position: absolute;
            display: block;
            width: 50%;
            height: 1px;
            background-color: $bdClr;
            @extend %gm-vertical-center;
        }
        &:before {
            left: 0;
            margin-left: -1.24rem;
        }
        &:after {
            right: 0;
            margin-right: -1.24rem;
        }
    }
}
</style>
