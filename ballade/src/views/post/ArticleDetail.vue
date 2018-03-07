<template>
    <section class="gm-content">
        <div class="common" v-if="articleType == 7">
            <img class="banner" :src="articleDetail.banner[0]" v-if="articleDetail.banner" />
            <div class="bar-placeholder" :style="{ height: titleBarHeight + 'px' }" v-else></div>
            <div class="article-detail">
                <div class="author gm-ellipsis-row1">
                    <img :src="articleDetail.author.portrait" />
                    <span>{{ articleDetail.author.nickname }}</span>
                </div>
                <h3>{{ articleDetail.title }}</h3>
                <p class="article-desc" v-if="articleDetail.desc">{{ articleDetail.desc }}</p>
                <div class="author-desc" v-if="articleDetail.author.desc"><span>个人自述</span>{{ articleDetail.author.desc }}</div>
                <fixed-richtext :data="articleDetail.richtext"></fixed-richtext>
            </div>
        </div>
        <div class="related-article" v-if="relatedArticles.length">
            <h4>相关专栏</h4>
            <ul>
                <li v-for="article in relatedArticles">
                    <a :href="'gengmei://article?article_id=' + article.id" class="gm-block">
                        <h3 class="gm-ellipsis-row1">{{ article.title }}</h3>
                        <p class="gm-ellipsis-row3">{{ article.desc }}</p>
                        <div class="stat"><span>赞 · {{ article.vote_count }}</span><span>评论 · {{ article.comment_count }}</span></div>
                    </a>
                </li>
            </ul>
        </div>
        <footer-bar>
            <ul class="gm-clear">
                <li class="vote">
                    <span>赞<em v-if="articleDetail.vote_count">·</em></span>
                    <span>{{ articleDetail.vote_count }}</span>
                </li>
                <li class="comment">
                    <span>评论<em v-if="articleDetail.comment_count">·</em></span>
                    <span>{{ articleDetail.comment_count }}</span>
                </li>
            </ul>
        </footer-bar>
    </section>
</template>

<script>
import FixedRichtext from '@/templates/FixedRichtext'
import FooterBar from '@/components/FooterBar'

export default {
    name: 'ArticleDetail',

    components: {
        FixedRichtext,
        FooterBar
    },

    data () {
        return {
            titleBarHeight: 0,
            article_id: null,
            articleType: null,
            articleDetail: {},
            relatedArticles: []
        }
    },

    created () {
        this.titleBarHeight = this.$router.query('title_bar_height')
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
                    this.relatedArticles = detail.related_article
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

.gm-fixed-richtext {
    margin-top: .5rem;
}
.related-article {
    margin: .28rem 0 1rem;
    h4 {
        font-size: .28rem;
        line-height: .68rem;
        padding: 0 .3rem;
    }
    ul {
        padding: 0 .3rem;
        background-color: #FFF;
    }
    li {
        padding: .3rem 0;
        border-bottom: 1px solid $bdClr;
        &:last-child {
            border-bottom: none;
        }
        h3 {
            font-size: .32rem;
            line-height: .52rem;
            margin-top: -.1rem;
            &:before {
                content: "专栏";
                display: inline-block;
                vertical-align: 1px;
                font-size: .24rem;
                line-height: .32rem;
                text-align: center;
                color: #FFF;
                width: .6rem;
                margin-right: .2rem;
                border-radius: 3px;
                background-color: #37BBF7;
            }
        }
        p.gm-ellipsis-row3 {
            font-size: .28rem;
            line-height: .4rem;
            color: $fClrWeak;
        }
    }
    .stat {
        font-size: .24rem;
        line-height: .24rem;
        color: $fClrWeaker;
        margin-top: .2rem;
        span + span {
            margin-left: .5rem;
        }
    }
}
.gm-footer {
    font-size: 13px;
    line-height: 1.1rem;
    text-align: center;
    color: #FFF;
    background-color: #333;
    li {
        position: relative;
        float: left;
        width: 50%;
        span:first-child {
            padding-left: 20px;
            background: transparent no-repeat 0 0;
            background-size: auto 13px;
        }
        &:first-child:after {
            content: "";
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            width: 1px;
            height: .3rem;
            margin-top: -.15rem;
            background-color: #999;
        }
    }
    .vote span:first-child {
        background-image: url("../../assets/imgs/post/icon_vote_footer.png");
    }
    .voted span:first-child {
        background-image: url("../../assets/imgs/post/icon_voted_footer.png");
    }
    .comment span:first-child {
        background-image: url("../../assets/imgs/post/icon_comment_footer.png");
    }
}
</style>
