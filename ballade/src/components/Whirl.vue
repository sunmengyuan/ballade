<template>
    <div class="gm-whirl">
        <div class="whirl">
            <span v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.gm-whirl {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
}
.whirl {
    position: relative;
    width: 1rem;
    height: 1rem;
    @extend %gm-center;
}
.whirl span {
    position: absolute;
    width: 0.2rem;
    height: 0.2rem;
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
    .whirl span:nth-child(#{$index}) {
        animation-delay: $index*0.08s;
    }
}

.whirl span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -0.1rem;
}
.whirl span:nth-child(2) {
    left: 0.14rem;
    top: 0.14rem;
}
.whirl span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -0.1rem;
}
.whirl span:nth-child(4) {
    top: 0.14rem;
    right: 0.14rem;
}
.whirl span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -0.1rem;
}
.whirl span:nth-child(6) {
    right: 0.14rem;
    bottom: 0.14rem;
}
.whirl span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -0.1rem;
}
.whirl span:nth-child(8) {
    bottom: 0.14rem;
    left: 0.14rem;
}
</style>
