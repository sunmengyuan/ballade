<template>
    <div class="gm-richtext gm-fixed-richtext">
        <div v-html="data"></div>
        <script type="text/x-tmpl" id="tmpl_service">
            <a href="gengmei://service?service_id={%=o.id%}" class="card service-card">
                <div class="gm-tiny-scale">
                    <img src="{%=o.image%}" />
                    <h4 class="gm-ellipsis-row1">{%=o.short_desc%}</h4>
                    <div class="bio gm-ellipsis-row1">{% if (o.doctor) { %}<span>{%=o.doctor%}</span>{% } %}{% if (o.hospital) { %}<span>{%=o.hospital%}</span>{% } %}</div>
                    <div class="price">&yen;<span>{%=o.price%}</span>{% if (o.is_price_range) { %}起{% } %}</div>
                </div>
                <span class="tag">去购买</span>
            </a>
        </script>
        <script type="text/x-tmpl" id="tmpl_expert">
            <a href="{% if (o.type == 1) { %}gengmei://expert?expert_id={%=o.id%}{% } %}{% if (o.type == 2) { %}gengmei://organization_detail?organization_id={%=o.id%}{% } %}" class="card expert-card">
                <div class="gm-tiny-scale">
                    <img src="{%=o.portrait%}" />
                    <h4 class="gm-ellipsis-row1">{%=o.name%}</h4>
                    <div class="title gm-ellipsis-row1">{% if (o.title) { %}<span>{%=o.title%}</span>{% } %}<span>{%=o.hospital%}</span></div>
                    {% if (o.tags.length) { %}
                    <ul class="gm-clear">
                        {% for (var i = 0;i < o.tags.length;i++) { %}
                        <li>{%=o.tags[i]%}</li>
                        {% } %}
                    </ul>
                    {% } %}
                </div>
                <span class="tag">关注</span>
            </a>
        </script>
        <script type="text/x-tmpl" id="tmpl_rank">
            <a href="gengmei://common_webview?url={%=o.server%}/hybrid/rank_list/{%=o.id%}" class="card rank-card">
                <img src="{%=o.banner%}" />
                <h4 class="gm-center gm-ellipsis-row1"><span>{%=o.title%}</span></h4>
            </a>
        </script>
        <script type="text/x-tmpl" id="tmpl_qa">
            <a href="gengmei://answer_detail?answer_id={%=o.answer_id%}&from=article_detail" class="card qa-card">
                <div>
                    <h4 class="gm-ellipsis-row1">{%=o.question%}</h4>
                    <p class="gm-ellipsis-row2">{%=o.answer%}</p>
                    <span class="tag">去看看</span>
                </div>
            </a>
        </script>
        <script type="text/x-tmpl" id="tmpl_diary">
            <a href="gengmei://diary?diary_id={%=o.id%}" class="card diary-card">
                {% if (o.before_img || o.after_img) { %}
                <ul class="gm-clear">
                    {% if (o.before_img) { %}
                    <li>
                        <div class="gm-nothumb">
                            <img src="{%=o.before_img%}" />
                        </div>
                        <span class="gm-tiny-scale">Before</span>
                    </li>
                    {% } %}
                    {% if (o.after_img) { %}
                    <li>
                        <div class="gm-nothumb">
                            <img src="{%=o.after_img%}" />
                        </div>
                        <span class="gm-tiny-scale">After</span>
                    </li>
                    {% } %}
                </ul>
                {% } %}
                <h4>{% if (o.area) { %}{%=o.area%} · {% } %}{% if (o.tag != null) { %}{%=o.tag.tag_name%}{% } %}日记本</h4>
                <div class="bio gm-tiny-scale">浏览 {%=o.view_count%} · 评论 {%=o.comment_count%} · 赞 {%=o.vote_count%}</div>
            </a>
        </script>
        <script type="text/x-tmpl" id="tmpl_service_list">
            {% var tag_ids = []; %}
            {% for (var i = 0;i < o.tags.length;i++) {
                tag_ids.push(o.tags[i].id);
            } %}
            <a href="gengmei://service_list?tag_ids=[{%=tag_ids%}]&type=normal" class="card service-list-card">
                <h4 class="gm-ellipsis-row1">{%=o.tags[0].name%}项目</h4>
                <h5 class="gm-ellipsis-row1">{%=o.subtitle%}</h5>
                <span class="tag">立即进入</span>
            </a>
        </script>
    </div>
</template>

<script>
import Tmpl from '@/utils/libs/tmpl.min'

export default {
    props: {
        data: {
            type: String,
            default: ''
        }
    },

    mounted () {
        var cards = document.querySelectorAll('div[data-type][data-info]')
        for (let i = 0; i < cards.length; i++) {
            var type = cards[i].getAttribute('data-type')
            var info = JSON.parse(cards[i].getAttribute('data-info'))
            info.server = this.GLOBAL.server
            cards[i].innerHTML = Tmpl(`tmpl_${type}`, info)
        }
    }
}
</script>

<style lang="scss">
@import "../assets/richtext";

.gm-fixed-richtext {
    div[data-type][data-info] {
        margin: .3rem 0;
    }
    div[data-type][data-info]:first-child,
    p:first-child {
        margin-top: 0;
    }
    div[data-type][data-info]:last-child,
    p:last-child {
        margin-bottom: 0;
    }
    .gm-tiny-scale {
        @extend %gm-tiny-scale;
    }
    .gm-center {
        @extend %gm-center;
    }
    .gm-nothumb {
        @include gm-nothumb();
    }
}
.gm-fixed-richtext .tag {
    position: absolute;
    right: 0;
    bottom: 8px;
    font-size: 14px;
    line-height: 26px;
    color: #FFF;
    padding: 0 12px 0 15px;
    border-top-left-radius: 13px;
    border-bottom-left-radius: 13px;
    background-color: $fClr7690;
    &:before {
        content: "";
        position: absolute;
        right: -3px;
        bottom: 26px;
        width: 0;
        height: 0;
        border: 3px solid transparent;
        border-left-color: #D22143;
        border-top-width: 2px;
        border-bottom-width: 0;
    }
}
.gm-fixed-richtext a.card {
    display: block;
    text-decoration: none;
    color: $fClrTitle;
    ul, li {
        list-style-type: none;
        margin: 0;
    }
    img {
        margin: 0;
    }

    &.service-card, &.expert-card {
        position: relative;
        height: 1.72rem;
        padding-right: 3px;
        margin-right: -3px;
        overflow: hidden;
        & > div {
            position: relative;
            height: 3.44rem;
            padding: .48rem .48rem .48rem 3.28rem;
            margin: -.86rem -50%;
            border: 2px solid $bdClr;
            border-radius: 6px;
        }
        img {
            position: absolute;
            left: .48rem;
            top: .48rem;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 6px;
        }
        h4 {
            font-size: .6rem;
            line-height: .78rem;
            margin-top: -.1rem;
        }
        .bio, .title {
            font-size: .52rem;
            color: $fClrWeak;
            span + span {
                padding-left: .52rem;
            }
        }
    }
}

/* 美购卡片 */
.gm-fixed-richtext a.service-card {
    .bio {
        line-height: .76rem;
        height: .76rem;
        margin-top: .12rem;
    }
    .price {
        font-size: .36rem;
        line-height: .6rem;
        color: $fClr7690;
        margin-top: .26rem;
        span {
            font-size: .6rem;
        }
        &:first-letter {
            font-size: .4rem;
        }
    }
}

/* 专家机构卡片 */
.gm-fixed-richtext a.expert-card {
    .title {
        line-height: .78rem;
        height: .78rem;
    }
    ul {
        height: .68rem;
        margin: .26rem -.1rem 0;
        padding-right: 2rem;
        overflow: hidden;
    }
    li {
        float: left;
        font-size: .44rem;
        line-height: .68rem;
        color: $fClrWeaker;
        padding: 0 .22rem;
        margin: 0 .1rem;
        border-radius: 6px;
        background-color: #F0F0F0;
    }
}

/* 榜单卡片 */
.gm-fixed-richtext a.rank-card {
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    img {
        width: 100%;
    }
    h4 {
        position: relative;
        position: absolute !important;
        max-width: 80%;
        font-size: .36rem;
        line-height: .8rem;
        color: #FFF;
        white-space: nowrap;
        padding: 0 .24rem;
        border-top: 2px solid #FFF;
        border-bottom: 2px solid #FFF;
        border-radius: 2px;
    }
    h4:before, h4:after, span:before, span:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 6px;
        background-color: #FFF;
    }
    h4:before {
        right: 0;
        top: 0;
    }
    h4:after {
        left: 0;
        top: 0;
    }
    span:before {
        right: 0;
        bottom: 0;
    }
    span:after {
        left: 0;
        bottom: 0;
    }
}

/* 问答卡片 */
.gm-fixed-richtext a.qa-card {
    padding-right: 3px;
    margin-right: -3px;
    & > div {
        position: relative;
        padding: .16rem 1.48rem .24rem .24rem;
        border: 1px solid $bdClr;
        border-radius: 3px;
    }
    h4 {
        font-size: .28rem;
        line-height: .44rem;
        margin-right: -1.38rem;
        &:before {
            content: "问答";
            display: inline-block;
            vertical-align: 1px;
            font-size: .24rem;
            line-height: .32rem;
            color: #FFF;
            padding: 0 .08rem;
            margin-right: .2rem;
            border-radius: 2px;
            background-color: #FFA7A2;
        }
    }
    p.gm-ellipsis-row2 {
        font-size: .26rem;
        line-height: .38rem;
        color: $fClrWeak;
    }
    .tag {
        right: -3px;
    }
}

/* 日记本卡片 */
.gm-fixed-richtext a.diary-card {
    padding: .3rem .24rem .2rem;
    border: 1px solid $bdClr;
    border-radius: 3px;
    overflow: hidden;
    ul {
        margin: 0 -.1rem;
    }
    li {
        position: relative;
        float: left;
        width: 50%;
        padding: 0 .1rem;
        box-sizing: border-box;
        span {
            position: absolute;
            left: .1rem;
            bottom: 0;
            font-size: .44rem;
            line-height: .72rem;
            text-align: center;
            color: #FFF;
            width: 1.84rem;
            margin: -.18rem -.46rem;
            border-top-right-radius: .32rem;
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
    .gm-nothumb {
        border-radius: 3px;
        overflow: hidden;
    }
    h4 {
        font-size: .3rem;
        line-height: .46rem;
        margin-top: -.08rem;
    }
    ul + h4 {
        margin-top: .18rem;
    }
    img {
        width: 100%;
    }
    .bio {
        font-size: .44rem;
        line-height: .68rem;
        color: $fClrWeaker;
        margin: -.16rem -50%;
    }
}

/* 美购列表卡片 */
.gm-fixed-richtext a.service-list-card {
    position: relative;
    padding: .2rem .38rem .22rem;
    border: 1px solid $bdClr;
    border-radius: 3px;
    background: url("#{$src}/post/bg_service_list_card_article.png") no-repeat 0 0;
    background-size: 100% 1.48rem;
    h4 {
        font-size: .34rem;
        line-height: .58rem;
        color: $clr7690;
    }
    h5 {
        font-size: .28rem;
        line-height: .48rem;
        color: #565F82;
        padding-right: 1.38rem;
    }
    .tag {
        right: -4px;
    }
}
</style>
