<template>
    <div class="comment-item" :class="[{ active: isActive }, 'comment-item' + index]" @click="tapComment">
        <div class="userinfo" @click="tapAvatar">
            <img :src="data.user_portrait" />
            <span class="nickname gm-ellipsis-row1">{{ data.user_nickname }}</span>
            <span class="time gm-ellipsis-row1">{{ data.reply_date }}</span>
        </div>
        <div class="comment" @click="triggerAlert($event, data.reply_id, data.user_nickname)">{{ data.content }}</div>
        <div class="sub-comment">
            <div
                class="reply"
                v-for="reply in replys"
                :key="reply.comment_id"
                @click="triggerAlert($event, reply.comment_id, reply.nickname)"><a href="javascript:;" @click="$app.userSkip(reply.comment_user_type, reply.comment_user_id)">{{ reply.nickname }}</a><template v-if="reply.at_nickname">回复了<a href="javascript:;" @click="$app.userSkip(reply.at_user_type, reply.at_user_id)">{{ reply.at_nickname }}</a></template>：{{ reply.content }}</div>
            <div v-if="showmore"><span class="btn-showmore" @click="triggerShowmore">共{{ replyCount }}条回复 ></span></div>
            <div v-if="!showmore && (replyCount > 6)"><span class="btn-showmore" @click="triggerShowmore">收起 ></span></div>
        </div>
        <div class="btns gm-clear">
            <vote
                :id="data.reply_id"
                :voted.sync="vote.voted"
                :count.sync="vote.count"
                :request="vote.request"
                :callback="trackVote">
                <span class="btn-vote" :class="{ voted: vote.voted }">{{ vote.count || '' }}</span>
            </vote>
            <span class="btn-reply" @click="addReply(data.reply_id, data.user_nickname)"></span>
        </div>
    </div>
</template>

<script>
import Vote from '@/components/Vote'
import Base64 from '@/utils/libs/base64'

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
        index: {
            type: Number,
            default: 0
        },
        data: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    components: {
        Vote
    },

    data () {
        return {
            isActive: false,
            showmore: false,
            vote: {
                voted: false,
                count: 0
            }
        }
    },

    computed: {
        replys () {
            var replys = this.data.comments
            return this.showmore
                ? replys.slice(0, 6).concat(replys.slice(replys.length - this.data.addReplyCount))
                : replys
        },
        replyCount () {
            return this.data.comments.length
        }
    },

    created () {
        if (this.replyCount > 6) this.showmore = true

        // 点赞
        this.vote.voted = this.data.is_liked
        this.vote.count = this.data.favor_amount

        // article 属 topic 类
        var type = (this.type === 'article') ? 'topic' : this.type
        switch (type) {
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
            case 'answer':
                this.vote.request = {
                    add: '/hybrid/answer/answer_reply_vote/_data',
                    cancel: '/hybrid/answer/answer_reply_cancel_vote/_data'
                }
                break
        }
    },

    methods: {
        triggerShowmore () {
            switch (this.showmore) {
                case true:
                    this.showmore = false
                    break
                case false:
                    this.showmore = true
                    break
            }
        },
        addReply (replyId, replyName) {
            // article 属 topic 类
            var type = (this.type === 'article') ? 'topic' : this.type
            this.$app.trackEvent({
                type: 'comment_item_click_reply',
                params: {
                    from: window.pageName,
                    business_id: this.business_id,
                    click_area: 'icon'
                }
            }, () => {
                window.location.href = `gengmei://add_comment?index=${this.index}&reply_id=${replyId}&reply_name=${Base64.encoder(replyName)}&reply_parent_id=${this.data.reply_id}&belong_id=${this.business_id}&comment_type=${type}`
            })
        },
        triggerAlert (e, replyId, replyName) {
            if (e.target.tagName !== 'A') {
                // article 属 topic 类
                var type = (this.type === 'article') ? 'topic' : this.type
                this.$app.trackEvent({
                    type: 'comment_item_click_reply',
                    params: {
                        from: window.pageName,
                        business_id: this.business_id,
                        click_area: 'text'
                    }
                }, () => {
                    window.location.href = `gengmei://topic_comment_alert?index=${this.index}&reply_id=${replyId}&reply_name=${Base64.encoder(replyName)}&reply_parent_id=${this.data.reply_id}&belong_id=${this.business_id}&comment_type=${type}`
                })
            }
        },
        tapComment () {
            this.isActive = true
            var t = setTimeout(() => {
                this.isActive = false
                clearTimeout(t)
            }, 96)
        },
        tapAvatar () {
            this.$app.trackEvent({
                type: 'comment_item_click_avatar',
                params: {
                    from: window.pageName,
                    business_id: this.business_id,
                    reply_id: this.data.reply_id
                }
            }, () => {
                this.$app.userSkip(this.data.user_type, this.data.user_id)
            })
        },
        trackVote () {
            this.$app.trackEvent({
                type: 'comment_item_click_vote',
                params: {
                    from: window.pageName,
                    business_id: this.business_id,
                    reply_id: this.data.reply_id
                }
            })
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
    &.active {
        background-color: #FAFAFA;
    }
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
