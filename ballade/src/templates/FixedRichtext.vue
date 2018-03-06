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
            var innerHTML = Tmpl('tmpl_service', JSON.parse(info))
            cards[i].innerHTML = innerHTML
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
    .tag {
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
}
</style>
