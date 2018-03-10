<template>
    <a :href="addCommentUrl" class="input">
        <img :src="GLOBAL.curUser.portrait" />
        <span></span>
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
