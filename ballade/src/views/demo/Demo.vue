<template>
    <section class="demo-wrap">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <section class="gm-content" v-else>
            <btn class="button" :type="'gradPink'" @click="showAlert">点我</btn>
            <div class="topic-detail" v-if="topicDetail.content">
                <div class="content" v-html="topicDetail.content"></div>
                <img :src="item.image" v-for="item in topicDetail.images" />
            </div>
            <nodata v-if="showEmpty"></nodata>
            <div class="service-list gm-clear" v-else>
                <service-square
                    :data="service"
                    :key="service.id"
                    v-for="service in services"></service-square>
            </div>
            <loading :loading="loading" v-show="showLoading"></loading>
        </section>
    </section>
</template>

<script>
import Loadmore from '@/utils/loadmore'
import ServiceSquare from '@/templates/ServiceSquare'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import Nodata from '@/components/Nodata'
import Whirl from '@/components/Whirl'
import Btn from '@/components/Btn'

export default {
    name: 'Demo',

    components: {
        ServiceSquare,
        Loading,
        Error,
        Nodata,
        Whirl,
        Btn
    },

    data () {
        return {
            topic_id: null,
            service_id: null,
            topicDetail: {},
            services: [],
            loading: true,
            showLoading: false,
            showEmpty: false,
            showWhirl: true,
            showError: false
        }
    },

    created () {
        this.topic_id = this.$router.query('topic_id')
        this.service_id = this.$router.query('service_id')
        this.loadTopicDetail()
        this.clientJS()
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.showToast !== 'undefined')) {
            gmclient.showToast(JSON.stringify({
                text: '我是 Native Toast',
                duration: 0
            }))
        }
    },

    methods: {
        loadTopicDetail: function () {
            this.$request({
                url: '/hybrid/topic_detail/_data',
                params: {
                    topic_id: this.topic_id
                },
                successFn: (data) => {
                    var detail = data.data.detail
                    this.topicDetail = detail.topic
                    this.showWhirl = false
                    this.loadRelatedServices()
                    this.showLoading = true
                    /* eslint-disable no-undef */
                    if (typeof gmclient !== 'undefined') {
                        if (typeof gmclient.setPageData !== 'undefined') {
                            gmclient.setPageData(JSON.stringify({
                                page_name: 'demo',
                                share_data: detail.share_data
                            }))
                        }
                        if (typeof gmclient.setPageTitle !== 'undefined') {
                            gmclient.setPageTitle(detail.top_title)
                        }
                    }
                },
                errorFn: () => {
                    this.showError = true
                    this.showWhirl = false
                }
            })
        },
        loadRelatedServices: function () {
            Loadmore.do(this, {
                url: '/hybrid/promotion/related_service/_data',
                params: {
                    service_id: this.service_id
                },
                callbackFn: (data) => {
                    var list = this.services
                    list = list.concat(data)
                    this.services = list
                    this.loading = true
                },
                completeFn: (data) => {
                    this.loading = false
                },
                nodataFn: (data) => {
                    this.showEmpty = true
                },
                errorFn: (data) => {
                    this.loading = 'error'
                }
            })
        },
        clientJS: function () {
            window.gmJS.showAlert = () => {
                alert('我是 H5 Alert')
            }
        },
        showAlert: function () {
            /* eslint-disable no-undef */
            if ((typeof gmclient !== 'undefined') && (typeof gmclient.showAlert !== 'undefined')) {
                gmclient.showAlert(JSON.stringify({
                    title: '提示',
                    content: '我是 Native Alert',
                    confirm_text: '确定',
                    confirm_callback: 'window.gmJS.showAlert()'
                }))
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.topic-detail {
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    background-color: #FFF;
    img {
        margin: 0.2rem auto;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
.service-list {
    padding: 0.2rem;
}
.button.gm-btn {
    display: block;
    font-size: 0.3rem;
    line-height: 0.8rem;
}
</style>
