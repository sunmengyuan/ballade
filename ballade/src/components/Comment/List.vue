<template>
    <a :href="addCommentUrl" class="input">
        <img :src="GLOBAL.curUser.portrait" />
        <span>{{ tips }}</span>
    </a>
</template>

<script>
export default {
    props: {
        business_id: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'topic'
        }
    },

    data () {
        return {
            tips: '',
            addCommentUrl: '',
            viewMoreUrl: ''
        }
    },

    created () {
        var addCommentType = this.type
        var viewMoreType = this.type
        switch (this.type) {
            case 'article':
                addCommentType = 'topic'
                break
            default:
                break
        }
        this.addCommentUrl = `gengmei://add_comment?${addCommentType}_id=${this.business_id}`
        this.viewMoreUrl = `gengmei://comment_detail?${viewMoreType}_id=${this.business_id}`
        this.randomTips()
    },

    methods: {
        randomTips () {
            var tips = [
                '有什么想法，就快来评论吧~',
                '回个评论再走嘛',
                '只看不回都是套路，点赞评论才是真爱',
                'po主写的好努力，快来评论鼓励ta一下',
                '你都不评论一下吗',
                '害羞就点赞，胆大就评论',
                '喜欢也分好多种，敢评论最有种'
            ]
            var random = Math.ceil(Math.random() * 7) - 1
            this.tips = tips[random]
        }
    }
}
</script>

<style lang="scss" scoped>
a.input {
    display: block;
    position: relative;
    padding: .3rem .3rem .3rem 1.1rem;
    background-color: #FFF;
    img {
        position: absolute;
        left: .3rem;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        @extend %gm-vertical-center;
    }
    span {
        display: block;
        font-size: .26rem;
        line-height: .38rem;
        color: $fClrWeak;
        padding: .2rem .3rem;
        background-color: #F5F5F5;
        border-radius: 3px;
    }
}
</style>
