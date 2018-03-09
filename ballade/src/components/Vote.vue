<template>
    <div class="gm-vote" @click="triggerVote">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: [String, Number],
            default: ''
        },
        voted: {
            type: Boolean,
            default: false
        },
        count: {
            type: Number,
            default: 0
        },
        request: {
            type: Object,
            default: {}
        }
    },

    created () {
        console.log('创建')
    },

    methods: {
        triggerVote () {
            switch (this.voted) {
                case true:
                    this.$request({
                        url: this.request.cancel,
                        method: 'POST',
                        data: {
                            id: this.id
                        },
                        successFn: () => {
                            this.voted = false
                            this.count--
                            this.$emit('update:voted', this.voted)
                            this.$emit('update:count', this.count)
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
                        url: this.request.add,
                        method: 'POST',
                        data: {
                            id: this.id
                        },
                        successFn: () => {
                            this.voted = true
                            this.count++
                            this.$emit('update:voted', this.voted)
                            this.$emit('update:count', this.count)
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
