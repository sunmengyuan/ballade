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
    color: #999;
    margin: 0.5rem 0.8rem;
    overflow: hidden;
    .complete {
        position: relative;
        &:before, &:after {
            content: "";
            display: block;
            width: 50%;
            height: 1px;
            background-color: #F0F0F0;
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
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
