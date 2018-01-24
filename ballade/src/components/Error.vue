<template>
    <section class="gm-error">
        <img :src="GLOBAL.src + '/holder_error.png'">
        <p>{{ message }}</p>
        <a href="javascript:;" @click="reload">重新加载</a>
    </section>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: '原谅我一看到美人就不淡定'
        }
    },

    methods: {
        reload: () => {
            window.location.reload()
        }
    }
}
</script>

<style lang="scss" scoped>
.gm-error {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #FFF;
    img, p, a {
        position: absolute;
        @extend %gm-center;
    }
    img {
        width: 3.49rem;
        margin-top: -2.24rem;
    }
    p {
        font-size: 0.3rem;
        line-height: 0.4rem;
        color: $fClrWeak;
        margin-top: -0.76rem;
    }
    a {
        display: inline-block;
        font-size: 0.32rem;
        line-height: 0.66rem;
        color: #FFF;
        padding: 0 0.86rem;
        margin-top: 0.41rem;
        border-radius: 0.33rem / 50%;
        background: linear-gradient(90deg, #FF7096 0%, #FF5963 100%);
    }
}
</style>
