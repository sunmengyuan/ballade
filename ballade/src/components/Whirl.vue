<template>
    <div class="gm-whirl">
        <span v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"></span>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.gm-whirl {
    position: relative;
    width: 2rem;
    height: 2rem;
}
.gm-whirl span {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: $clrLight;
    animation: whirl 1.04s ease infinite;
    @keyframes whirl {
        0% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(0.3);
            opacity: 0.5;
        }
    }
}

.gm-whirl span {
    $oOffset: -0.2rem;
    $eOffset: 0.28rem;
    @for $index from 1 through 8 {
        &:nth-child(#{$index}) {
            animation-delay: $index*0.13s;
        }
    }
    &:nth-child(1), &:nth-child(5) {
        margin-top: $oOffset;
    }
    &:nth-child(3), &:nth-child(7) {
        margin-left: $oOffset;
    }
    &:nth-child(2), &:nth-child(4) {
        top: $eOffset;
    }
    &:nth-child(2), &:nth-child(8) {
        left: $eOffset;
    }
    &:nth-child(4), &:nth-child(6) {
        right: $eOffset;
    }
    &:nth-child(6), &:nth-child(8) {
        bottom: $eOffset;
    }
    &:nth-child(1) {
        left: 0;
        top: 50%;
    }
    &:nth-child(3) {
        left: 50%;
        top: 0;
    }
    &:nth-child(5) {
        right: 0;
        top: 50%;
    }
    &:nth-child(7) {
        left: 50%;
        bottom: 0;
    }
}
</style>
