<template>
    <a href="javascript:;" class="gm-attention" @click="triggerAttention">
        <slot></slot>
    </a>
</template>

<script>
export default {
    props: {
        id: {
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
        }
    },

    methods: {
        triggerAttention () {
            switch (this.followed) {
                case true:
                    console.log('取消')
                    this.$emit('update:followed', false)
                    break
                case false:
                    console.log('添加')
                    this.$emit('update:followed', true)
                    break
            }
        }
    }
}
</script>
