<template>
    <a
        class="gm-attention"
        href="javascript:;"
        @click="triggerAttention">
        <slot></slot>
    </a>
</template>

<script>
/**
 * @id
 *     普通用户 id
 * @strid
 *     专家、机构 id
 * @type
 *     用户类型
 * @track
 *     埋点
 */
export default {
    props: {
        id: {
            type: [String, Number],
            default: ''
        },
        strid: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: [String, Number],
            default: 0
        },
        followed: {
            type: Boolean,
            default: false
        },
        track: {
            type: Object,
            default: {
                from: ''
            }
        }
    },

    methods: {
        triggerAttention () {
            var trackParams = {
                ...this.track,
                type: this.type,
                business_id: (this.type === 1 || this.type === 2) ? this.strid : this.id,
                action: this.followed ? 'undo' : 'do'
            }
            this.$app.trackEvent({
                type: 'attention_click',
                params: trackParams
            })
            switch (this.followed) {
                case true:
                    this.$request({
                        url: '/hybrid/user/del_follow/_data',
                        method: 'POST',
                        data: {
                            id: this.strid || this.id,
                            user_id: this.strid ? this.id : this.strid,
                            type: this.type
                        },
                        successFn: () => {
                            this.$emit('update:followed', false)
                        },
                        failFn: (data) => {
                            this.$app.showToast({
                                text: data.message,
                                duration: 0
                            })
                        }
                    })
                    break
                case false:
                    this.$request({
                        url: '/hybrid/user/add_follow/_data',
                        method: 'POST',
                        data: {
                            id: this.strid || this.id,
                            user_id: this.strid ? this.id : this.strid,
                            type: this.type
                        },
                        successFn: (data) => {
                            this.$emit('update:followed', true)
                            /* eslint-disable no-undef */
                            if ((typeof gmclient !== 'undefined') && (typeof gmclient.diaryDetailShowNotificationAlert !== 'undefined')) {
                                gmclient.diaryDetailShowNotificationAlert()
                            }
                            if (JSON.stringify(data.extra) !== '{}') {
                                /* eslint-disable no-undef */
                                if ((typeof gmclient !== 'undefined') && (typeof gmclient.showTaskAlert !== 'undefined')) {
                                    gmclient.showTaskAlert(JSON.stringify(data.extra))
                                }
                            }
                        },
                        failFn: (data) => {
                            if (data.error === 1001) {
                                this.$app.needLogin()
                            } else {
                                this.$app.showToast({
                                    text: data.message,
                                    duration: 0
                                })
                            }
                        }
                    })
                    break
            }
        }
    }
}
</script>
