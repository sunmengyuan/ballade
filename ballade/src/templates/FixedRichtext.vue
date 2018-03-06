<template>
    <div class="gm-richtext gm-fixed-richtext">
        <div v-html="data"></div>
        <script type="text/x-tmpl" id="tmpl_service">
            <a href="gengmei://service?service_id={%=o.id%}" class="card service-card gm-block">
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
            <a href="{% if (o.type == 1) { %}gengmei://expert?expert_id={%=o.id%}{% } %}{% if (o.type == 2) { %}gengmei://organization_detail?organization_id={%=o.id%}{% } %}" class="card expert-card gm-block">
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
            var info = cards[i].getAttribute('data-info')
            if (type == 'expert') {
                var innerHTML = Tmpl('tmpl_expert', JSON.parse(info))
                cards[i].innerHTML = innerHTML
            }
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
    text-decoration: none;
    color: $fClrTitle;
    ul, li {
        list-style-type: none;
        margin: 0;
    }
    img {
        margin: 0;
    }
}
.gm-fixed-richtext a.service-card,
.gm-fixed-richtext a.expert-card {
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
        border: 2px solid #F0F0F0;
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
</style>
