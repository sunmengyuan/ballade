<template>
    <div class="comment-container">
        <a
            class="input"
            :href="addCommentUrl"
            v-if="showInput"
            @click.prevent="triggerComment($event)">
            <img :src="loginUser.portrait" />
            <span>{{ tips }}</span>
        </a>
        <div class="comment-list">
            <comment-item
                v-for="comment in data"
                :key="comment.reply_id"
                :data="comment"></comment-item>
        </div>
        <a
            class="btn-viewmore"
            :href="viewmoreUrl"
            v-if="showViewmore && count">查看全部{{ count }}条评论</a>
    </div>
</template>

<script>
import CommentItem from '@/components/Comment/Item'

export default {
    props: {
        business_id: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'topic'
        },
        count: {
            type: Number,
            default: 0
        },
        data: {
            type: Array,
            default: []
        },
        loginUser: {
            type: Object,
            default: {
                id: null,
                portrait: ''
            }
        },
        showInput: {
            type: Boolean,
            default: true
        },
        showViewmore: {
            type: Boolean,
            default: true
        }
    },

    components: {
        CommentItem
    },

    data () {
        return {
            tips: '',
            addCommentUrl: '',
            viewmoreUrl: ''
        }
    },

    created () {
        var addCommentType = this.type
        var viewmoreType = this.type
        switch (this.type) {
            case 'article':
                addCommentType = 'topic'
                break
            default:
                break
        }
        this.addCommentUrl = `gengmei://add_comment?${addCommentType}_id=${this.business_id}`
        this.viewmoreUrl = `gengmei://comment_detail?${viewmoreType}_id=${this.business_id}`
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
        },
        triggerComment (e) {
            this.loginUser.id
                ? (window.location.href = e.currentTarget.href)
                : this.$app.needLogin()
        }
    }
}
</script>

<style lang="scss" scoped>
a.input {
    display: block;
    position: relative;
    padding: .3rem .3rem .3rem 1.1rem;
    border-bottom: 1px solid $bdClr;
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
a.btn-viewmore {
    display: block;
    font-size: .28rem;
    line-height: .88rem;
    text-align: center;
    color: $fClrLink;
    background-color: #FFF;
}
</style>
