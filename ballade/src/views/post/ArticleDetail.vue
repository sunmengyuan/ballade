<template>
    <section class="article-wrap">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <section class="gm-content" v-else>
            <div class="common" v-if="articleDetail.article_type == 6">
                <img
                    class="banner"
                    :src="articleDetail.banner[0]"
                    v-if="articleDetail.banner"
                    @load="bannerLoaded($event)" />
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
            <div class="star" v-if="articleDetail.article_type == 7">
                <div class="banner-swiper">
                    <swiper>
                        <div class="swiper-slide" v-for="image in articleDetail.banner">
                            <img :src="image" class="gm-vertical-center" />
                        </div>
                    </swiper>
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
                    <li class="vote" :class="{ voted: vote.voted }">
                        <vote
                            :id="article_id"
                            :voted.sync="vote.voted"
                            :count.sync="vote.count"
                            :request="vote.request">
                            <span>赞<em v-if="vote.count">&nbsp;·&nbsp;</em></span>
                            <span v-if="vote.count">{{ vote.count }}</span>
                        </vote>
                    </li>
                    <li class="comment">
                        <a
                            class="gm-block"
                            :href="'gengmei://add_comment?topic_id=' + article_id"
                            @click.prevent="triggerComment($event)">
                            <span>评论<em v-if="articleDetail.comment_count">&nbsp;·&nbsp;</em></span>
                            <span>{{ articleDetail.comment_count }}</span>
                        </a>
                    </li>
                </ul>
            </footer-bar>
        </section>
    </section>
</template>

<script>
import FixedRichtext from '@/templates/FixedRichtext'
import FooterBar from '@/components/FooterBar'
import Whirl from '@/components/Whirl'
import Error from '@/components/Error'
import Vote from '@/components/Vote'
import Swiper from '@/components/Swiper'

export default {
    name: 'ArticleDetail',

    components: {
        FixedRichtext,
        FooterBar,
        Whirl,
        Error,
        Vote,
        Swiper
    },

    data () {
        return {
            article_id: null,
            articleDetail: {},
            relatedArticles: [],
            titleBarHeight: 0,
            showWhirl: true,
            showError: false,
            pageData: {},
            vote: {
                voted: false,
                count: 0,
                request: {
                    add: '/hybrid/api/topic/vote/_data',
                    cancel: '/hybrid/api/topic/cancel_vote/_data'
                }
            }
        }
    },

    created () {
        this.$app.setPageTitle('专栏')
        this.article_id = this.$router.query('article_id')
        this.titleBarHeight = this.$router.query('title_bar_height')
        this.loadArticleDetail()
    },

    methods: {
        loadArticleDetail () {
            this.$request({
                url: `/hybrid/article/${this.article_id}/_data`,
                successFn: (data) => {
                    var detail = data.data
                    this.articleDetail = detail
                    this.relatedArticles = detail.related_article
                    this.pageData = {
                        page_name: 'article_detail',
                        business_id: detail.article_id,
                        share_data: detail.share_data,
                        hide_share: false
                    }
                    this.showWhirl = false
                    // 点赞
                    this.vote.voted = detail.is_liked
                    this.vote.count = detail.vote_count
                },
                errorFn: () => {
                    this.showWhirl = false
                    this.showError = true
                }
            })
        },
        bannerLoaded (e) {
            this.pageData.header_height = e.target.height
            this.$app.setPageData(this.pageData)
        },
        triggerComment (e) {
            this.GLOBAL.curUser.id
                ? (window.location.href = e.currentTarget.href)
                : this.$app.needLogin()
        }
    }
}
</script>

<style lang="scss" scoped>
.gm-content {
    padding-bottom: 1.5rem;
}
.bar-placeholder {
    background-color: #FFF;
}
img.banner, .banner-swiper img {
    width: 100%;
}
.common {
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
    font-size: 0;
    text-align: center;
    color: #FFF;
    background-color: #333;
    a {
        color: #FFF;
    }
    li {
        position: relative;
        float: left;
        width: 50%;
        span, em {
            display: inline-block;
            font-size: 13px;
            line-height: 55px;
        }
        span:first-child {
            padding-left: 20px;
            background: transparent no-repeat 0 20px;
            background-size: auto 14px;
        }
        &:first-child:after {
            content: "";
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            width: 1px;
            height: 16px;
            margin-top: -8px;
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
