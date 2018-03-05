<template>
    <section class="gm-content">
        <section class="common">
            <img src="http://hera.s.igengmei.com/2016/05/12/f7714d5dbd" class="banner" />
            <div class="bar-placeholder" :style="{ height: barHeight + 'px' }"></div>
            <div class="article-detail">
                <div class="author">
                    <img src="http://pic.igengmei.com/2017/07/03/1034/41699b881fc0-thumb" />
                    <span>阿茶茶</span>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'ArticleDetail',

    data () {
        return {
            barHeight: 0
        }
    },

    created () {
        this.barHeight = this.$router.query('title_bar_height')
    },

    methods: {}
}
</script>

<style lang="scss" scoped>
.bar-placeholder {
    background-color: #FFF;
}
.common {
    .banner {
        width: 100%;
    }
}
</style>
