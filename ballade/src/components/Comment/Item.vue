<template>
    <div class="comment-item">
        <div class="userinfo" @click="$app.userSkip(item.user_type, item.user_id)">
            <img :src="item.user_portrait" />
            <span class="nickname gm-ellipsis-row1">{{ item.user_nickname }}</span>
            <span class="time gm-ellipsis-row1">{{ item.reply_date }}</span>
        </div>
        <div class="comment">{{ item.content }}</div>
        <div class="sub-comment">
            <div class="reply" v-for="reply in item.replys" :key="reply.comment_id"><a href="javascript:;" @click="$app.userSkip(reply.comment_user_type, reply.comment_user_id)">{{ reply.nickname }}</a><template v-if="reply.at_nickname">回复了<a href="javascript:;" @click="$app.userSkip(reply.at_user_type, reply.at_user_id)">{{ reply.at_nickname }}</a></template>：{{ reply.content }}</div>
            <div v-if="showmore"><span class="btn-showmore" @click="triggerShowmore">共{{ replyCount }}条回复 ></span></div>
            <div v-if="!showmore && (replyCount > 6)"><span class="btn-showmore" @click="triggerShowmore">收起 ></span></div>
        </div>
        <div class="btns gm-clear">
            <vote
                :id="item.reply_id"
                :voted.sync="vote.voted"
                :count.sync="vote.count"
                :request="vote.request">
                <span class="btn-vote" :class="{ voted: vote.voted }">{{ vote.count || '' }}</span>
            </vote>
            <span class="btn-reply"></span>
        </div>
    </div>
</template>

<script>
import Vote from '@/components/Vote'

export default {
    props: {
        data: {
            type: Object,
            default: {
                comments: []
            }
        },
        type: {
            type: String,
            default: 'topic'
        }
    },

    components: {
        Vote
    },

    data () {
        return {
            item: {},
            replyCount: 0,
            showmore: false,
            vote: {
                voted: false,
                count: 0
            }
        }
    },

    created () {
        var replys = this.data.comments
        if (replys.length > 6) this.showmore = true
        this.item = this.data
        this.item.replys = replys.slice(0, 6)
        this.replyCount = replys.length
        // 点赞
        this.vote.voted = this.data.is_liked
        this.vote.count = this.data.favor_amount
        switch (this.type) {
            case 'article':
                this.vote.request = {
                    add: '/hybrid/api/topicreply/vote/_data',
                    cancel: '/hybrid/api/topicreply/cancel_vote/_data'
                }
                break
            case 'topic':
                this.vote.request = {
                    add: '/hybrid/api/topicreply/vote/_data',
                    cancel: '/hybrid/api/topicreply/cancel_vote/_data'
                }
                break
            case 'diarybook':
                this.vote.request = {
                    add: '/hybrid/api/topicreply/vote/_data',
                    cancel: '/hybrid/api/topicreply/cancel_vote/_data'
                }
                break
        }
    },

    methods: {
        triggerShowmore () {
            var replys = this.data.comments
            switch (this.showmore) {
                case true:
                    this.showmore = false
                    this.item.replys = replys
                    break
                case false:
                    this.showmore = true
                    this.item.replys = replys.slice(0, 6)
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.comment-item {
    position: relative;
    padding: .35rem .3rem 0;
    background-color: #FFF;
    overflow: hidden;
    .userinfo {
        position: relative;
        width: 60%;
        min-height: .72rem;
        padding-left: .8rem;
        img {
            position: absolute;
            left: 0;
            top: .06rem;
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
        }
        span {
            display: block;
            color: $fClrWeaker;
        }
        .nickname {
            font-size: .28rem;
            line-height: .4rem;
        }
        .time {
            font-size: .2rem;
            line-height: .32rem;
        }
    }
    .comment {
        font-size: .28rem;
        line-height: .4rem;
        color: $fClrMain;
        padding-bottom: .2rem;
        margin: .08rem 0 0 .8rem;
    }
    .sub-comment {
        margin-left: .8rem;
        & > div {
            color: $fClrWeaker;
            padding: 0 .2rem;
            background-color: #F5F5F5;
        }
        div:first-child {
            padding-top: .12rem;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }
        div:last-child {
            padding-bottom: .12rem;
            margin-bottom: .2rem;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
        }
        .reply, .btn-showmore {
            font-size: .24rem;
            line-height: .4rem;
        }
        a, .btn-showmore {
            display: inline-block;
            color: $fClrLink;
            padding: 8px;
            margin: -8px;
        }
    }
    .btns {
        position: absolute;
        top: .5rem;
        right: .3rem;
        .gm-vote {
            float: left;
        }
        span {
            float: left;
            font-size: 12px;
            line-height: 15px;
            color: $fClrWeaker;
            height: 15px;
            padding: 5px 5px 5px 20px;
            margin: -5px -5px -5px 0;
            background: transparent no-repeat 0 0;
            background-size: 15px auto;
            &.btn-vote {
                background-image: url("../../assets/imgs/post/icon_vote_comment.png");
                background-position: 0 -17px;
            }
            &.btn-vote.voted {
                background-position: 0 4px;
            }
            &.btn-reply {
                margin-left: .33rem;
                background-image: url("../../assets/imgs/post/icon_comment.png");
                background-position: 0 5px;
            }
        }
    }
}
</style>
