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
/**
 * @class
 *     默认: 常态
 *     active: 点击态
 *     disabled: 失效态
 * @type
 *     请查看 /assets/btns
 */
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: 'javascript:;'
        },
        callback: {
            type: Function,
            default: () => {}
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
            this.callback()
            let t1 = setTimeout(() => {
                this.isActive = false
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
