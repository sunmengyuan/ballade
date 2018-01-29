<!--
normal: 常态
class="active": 点击态
class="disabled": 失效态
-->
<template>
    <a
        class="gm-btn"
        :href="href"
        :type="type"
        :class="{active: isActive}"
        @click="onTap">
        <slot></slot>
    </a>
</template>

<script>
export default {
    props: {
        // type 请参照 /assets/btns.scss
        type: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: 'javascript:;'
        }
    },

    data () {
        return {
            isActive: false
        }
    },

    methods: {
        onTap: function (e) {
            e.preventDefault()
            this.isActive = true
            // 模拟 click active 状态
            let t1 = setTimeout(() => {
                this.isActive = false
                // active 状态消失后执行跳转
                let t2 = setTimeout(() => {
                    window.location.href = e.target.href
                    clearTimeout(t2)
                }, 0)
                clearTimeout(t1)
            }, 100)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/btns";

@mixin btnStyle ($fClr, $bdClr, $background) {
    color: $fClr;
    border-color: $bdClr;
    background: $background;
}
@each $type, $status in $btns {
    .gm-btn[type=#{$type}] {
        $normal: map-get($status, normal);
        $active: map-get($status, active);
        $disabled: map-get($status, disabled);
        @include btnStyle(map-values($normal)...);
        &.active {
            @include btnStyle(map-values($active)...);
        }
        &.disabled {
            @include btnStyle(map-values($disabled)...);
        }
    }
}

.gm-btn {
    display: inline-block;
    text-align: center;
    border: 1px solid transparent;
    box-sizing: border-box;
}
</style>
