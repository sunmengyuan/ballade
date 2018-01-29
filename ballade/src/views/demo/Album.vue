<template>
    <section class="gm-content">
        <div class="banner">
            <lazy-img :src="'http://hera.s.igengmei.com/2016/05/12/f7714d5dbd'"></lazy-img>
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/d3965a1d96'"
                :ratio="0.6"></lazy-img>
        </div>
        <div class="tofu1">
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/43d8e50210-half'"
                :ratio="0.5"
                class="gm-item"></lazy-img>
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/209463c376-half'"
                :ratio="0.5"
                class="gm-item"></lazy-img>
        </div>
        <div class="tofu2">
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/aed4e175be-half'"
                :ratio="0.5"
                class="gm-item"></lazy-img>
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/aaf8e25546-half'"
                :ratio="0.5"
                class="gm-item"></lazy-img>
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/073fb80f70-half'"
                :ratio="0.5"
                class="gm-item"></lazy-img>
            <lazy-img
                :src="'http://hera.s.igengmei.com/2016/05/12/36bf70877f-half'"
                :ratio="0.5"
                class="gm-item"></lazy-img>
        </div>
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
.banner .gm-lazyimg {
    width: 100%;
}
.tofu1 {
    @extend %gm-col2;
}
.tofu2 {
    @extend %gm-col4;
}
</style>
