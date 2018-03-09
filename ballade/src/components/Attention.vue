<template>
    <a href="javascript:;" class="gm-attention">
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
    }
}
</script>
