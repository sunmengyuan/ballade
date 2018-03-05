<template>
    <section class="gm-content">
        <section class="common" v-if="articleType == 6">
            <img class="banner" :src="articleDetail.banner[0]" v-if="articleDetail.banner" />
            <div class="bar-placeholder" :style="{ height: barHeight + 'px' }" v-else></div>
            <div class="article-detail">
                <div class="author">
                    <img src="http://pic.igengmei.com/2017/07/03/1034/41699b881fc0-thumb" />
                    <span>阿茶茶</span>
                </div>
                <h3>这里是标题</h3>
                <p class="article-desc">这里是文章描述</p>
                <div class="author-desc"><span>个人自述</span>作者自述作者自述作者自述</div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'ArticleDetail',

    data () {
        return {
            barHeight: 0,
            article_id: null,
            articleType: null,
            articleDetail: {}
        }
    },

    created () {
        this.barHeight = this.$router.query('title_bar_height')
        this.article_id = this.$router.query('article_id')
        this.loadArticleDetail()
    },

    methods: {
        loadArticleDetail () {
            this.$request({
                url: `/hybrid/article/${this.article_id}/_data`,
                successFn: (data) => {
                    var detail = data.data
                    this.articleDetail = detail
                    this.articleType = detail.article_type
                },
                errorFn: () => {

                }
            })
        }
    }
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
    .author {
        position: relative;
        font-size: .26rem;
        line-height: .6rem;
        color: $fClrWeak;
        padding-left: .8rem;
        img {
            position: absolute;
            left: 0;
            top: 0;
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
        }
    }
    .article-detail {
        padding: .3rem;
        background-color: #FFF;
        h3 {
            font-size: .36rem;
            line-height: .54rem;
            margin: .36rem 0 .06rem;
        }
        .article-desc {
            font-size: .28rem;
            line-height: .42rem;
            color: $fClrWeaker;
        }
        .author-desc {
            position: relative;
            font-size: .26rem;
            line-height: .4rem;
            color: $fClrWeak;
            padding: .3rem .26rem .24rem;
            margin-top: .6rem;
            border: 1px solid $bdClr;
            border-radius: 3px;
            span {
                position: absolute;
                left: .46rem;
                top: -.18rem;
                font-size: .24rem;
                line-height: .36rem;
                padding: 0 .18rem;
                background-color: #FFF;
            }
        }
    }
}
</style>
