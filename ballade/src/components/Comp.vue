<template>
    <div class="comp">{{ message }}</div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: '我是组件'
        }
    }
}
</script>

<style lang="scss" scoped>
.comp {
    color: mediumpurple;
}
</style>
