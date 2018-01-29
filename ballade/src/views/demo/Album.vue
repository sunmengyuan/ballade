<template>
    <section class="gm-content">
        <lazy-img :src="'http://hera.s.igengmei.com/2016/05/12/f7714d5dbd'"></lazy-img>
    </section>
</template>

<script>
import LazyImg from '@/components/LazyImg'

export default {
    name: 'Album',

    components: {
        LazyImg
    }
}
</script>

<style lang="scss" scoped>
.gm-lazyimg {
    width: 100%;
}
</style>
