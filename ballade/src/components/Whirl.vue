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
    transform: scale(0);
    animation: whirl 0.64s ease infinite;
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

@for $index from 0 through 7 {
    .gm-whirl span:nth-child(#{$index}) {
        animation-delay: $index*0.08s;
    }
}

.gm-whirl span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -0.2rem;
}
.gm-whirl span:nth-child(2) {
    left: 0.28rem;
    top: 0.28rem;
}
.gm-whirl span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -0.2rem;
}
.gm-whirl span:nth-child(4) {
    top: 0.28rem;
    right: 0.28rem;
}
.gm-whirl span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -0.2rem;
}
.gm-whirl span:nth-child(6) {
    right: 0.28rem;
    bottom: 0.28rem;
}
.gm-whirl span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -0.2rem;
}
.gm-whirl span:nth-child(8) {
    bottom: 0.28rem;
    left: 0.28rem;
}
</style>
