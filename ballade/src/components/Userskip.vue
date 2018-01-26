<template>
    <a href="javascript:;" @click="onTap">
        <slot></slot>
    </a>
</template>

<script>
export default {
    props: {
        id: {
            type: [Number, String],
            default: ''
        },
        type: {
            type: [Number, String],
            default: ''
        }
    },

    methods: {
        onTap: function (e) {
            e.preventDefault()
            switch (this.type) {
                case 0:
                    window.location.href = `gengmei://other_homepage?uid=${this.id}`
                    break
                case 1:
                    window.location.href = `gengmei://expert?expert_id=${this.id}`
                    break
                case 2:
                    window.location.href = `gengmei://organization_detail?organization_id=${this.id}`
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
