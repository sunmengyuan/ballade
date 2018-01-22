<template>
    <div class="service-square-item">
        <a :href="'gengmei://service?service_id=' + data.id" class="gm-block">
            <div class="gm-nothumb">
                <img :src="data.image" />
            </div>
            <div class="service-bio gm-tiny-scale">
                <h4 class="gm-ellipsis-row2">{{ data.desc }}</h4>
                <div class="gm-clear">
                    <span>&yen;{{ data.price }}<em v-if="data.is_price_range">起</em></span>
                    <span>{{ data.appoint_count }}人已预约</span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style lang="scss" scoped>
.service-square-item {
    float: left;
    width: 50%;
    padding: 0.1rem;
    box-sizing: border-box;
    .gm-nothumb {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .service-bio {
        padding: 0.4rem;
        margin: -0.74rem 0 -0.74rem -50%;
        border: 1px solid #E5E5E5;
        border-top: none;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: #FFF;
    }
    .service-bio h4 {
        font-size: 0.48rem;
        line-height: 0.64rem;
        height: 1.28rem;
        margin-bottom: 0.24rem;
    }
    .service-bio > div {
        height: 0.6rem;
    }
    .service-bio span {
        &:first-child {
            float: left;
            font-size: 0.6rem;
            line-height: 0.62rem;
            color: #FF7690;
            &:first-letter, em {
                font-size: 0.36rem;
            }
        }
        & + span {
            float: right;
            font-size: 0.36rem;
            line-height: 0.8rem;
            color: #999;
        }
    }
}
</style>
