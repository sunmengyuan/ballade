<template>
    <section class="gm-content">
        <div class="topic-detail">
            <div class="content" v-html="topicDetail.content"></div>
            <img :src="item.image" v-for="item in topicDetail.images" />
        </div>
        <div class="service-list gm-clear">
            <service-square
                :data="service"
                :key="service.id"
                v-for="service in services"></service-square>
        </div>
    </section>
</template>

<script>
import Loadmore from '@/utils/loadmore'
import ServiceSquare from '@/templates/ServiceSquare'

export default {
    name: 'Demo',

    components: {
        ServiceSquare
    },

    data () {
        return {
            topic_id: null,
            service_id: null,
            topicDetail: {},
            services: []
        }
    },

    created () {
        this.topic_id = this.$router.query('topic_id')
        this.service_id = this.$router.query('service_id')
        this.loadTopicDetail()
        this.loadRelatedServices()
    },

    methods: {
        loadTopicDetail: function () {
            this.$request({
                url: '/hybrid/topic_detail/_data',
                params: {
                    topic_id: this.topic_id
                },
                successFn: (data) => {
                    this.topicDetail = data.data.detail.topic
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
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.topic-detail {
    padding: 0.3rem;
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
</style>
