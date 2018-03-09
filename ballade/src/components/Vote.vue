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
                            this.$emit('update:voted', false)
                            this.$emit('update:count', this.count - 1)
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
                            this.$emit('update:voted', true)
                            this.$emit('update:count', this.count + 1)
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
