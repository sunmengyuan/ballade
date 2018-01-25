<template>
    <div class="gm-loading">
        <div class="loading" v-if="loading === true">
            <img :src="GLOBAL.src + '/icon_loading.png'" />
            <span>正在加载...</span>
        </div>
        <div class="complete" v-if="loading === false">我们是有底线的</div>
        <div class="error" v-if="loading === 'error'">网络竟然崩溃了</div>
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
    .complete, .error {
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
    .loading {
        img, span {
            display: inline-block;
            vertical-align: middle;
        }
        img {
            width: 0.28rem;
            height: 0.28rem;
            margin-right: 0.1rem;
            animation: loading 0.5s linear infinite forwards;
            @keyframes loading {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
    }
}
</style>
