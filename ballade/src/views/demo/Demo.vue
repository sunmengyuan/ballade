<template>
    <section class="gm-content">
        <div class="topic-detail">
            <div class="content" v-html="topicDetail.content"></div>
            <img :src="item.image" v-for="item in topicDetail.images" />
        </div>
        <div class="service-list"></div>
    </section>
</template>

<script>
export default {
    name: 'Demo',

    data () {
        return {
            topic_id: null,
            service_id: null,
            topicDetail: {}
        }
    },

    created () {
        this.topic_id = this.$router.query('topic_id')
        this.service_id = this.$router.query('service_id')
        this.loadTopic()
    },

    methods: {
        loadTopic: function () {
            this.$request({
                url: '/hybrid/topic_detail/_data',
                params: {
                    topic_id: this.topic_id
                },
                successFn: (data) => {
                    this.topicDetail = data.data.detail.topic
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
</style>
