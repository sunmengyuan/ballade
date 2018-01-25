<template>
    <a
        href="javascript:;"
        class="gm-btn"
        :class="{active: isActive}"
        :type="type"
        @click="onTap">
        <slot></slot>
    </a>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'pureGreen'
        }
    },

    data () {
        return {
            isActive: false
        }
    },

    methods: {
        onTap: function () {
            this.isActive = true
        }
    }
}
</script>

<style lang="scss" scoped>
$btns: (
    /* 纯色绿 */
    pureGreen: (
        normal: (
            fClr: #FFF,
            bdClr: none,
            background: #3ADBD2
        ),
        active: (
            fClr: #FFF,
            bdClr: none,
            background: #1FB2A7
        ),
        disable: (
            fClr: #FFF,
            bdClr: none,
            background: #D5D5D5
        )
    ),
    /* 纯色粉 */
    purePink: (
        normal: (
            fClr: #FFF,
            bdClr: none,
            background: #FF7690
        ),
        active: (
            fClr: #FFF,
            bdClr: none,
            background: #E75873
        ),
        disable: (
            fClr: #FFF,
            bdClr: none,
            background: #D5D5D5
        )
    ),
    /* 纯色灰 */
    pureGrey: (
        normal: (
            fClr: #666,
            bdClr: #E5E5E5,
            background: #F5F5F5
        ),
        active: (
            fClr: #666,
            bdClr: #E5E5E5,
            background: #E5E5E5
        ),
        disable: (
            fClr: #FFF,
            bdClr: #D5D5D5,
            background: #D5D5D5
        )
    ),
    /* 线框绿 */
    bdGreen: (
        normal: (
            fClr: #3ADBD2,
            bdClr: #3ADBD2,
            background: transparent
        ),
        active: (
            fClr: #3ADBD2,
            bdClr: #3ADBD2,
            background: transparent
        ),
        disable: (
            fClr: #D5D5D5,
            bdClr: #D5D5D5,
            background: transparent
        )
    ),
    /* 线框粉 */
    bdPink: (
        normal: (
            fClr: #FF7690,
            bdClr: #FF7690,
            background: transparent
        ),
        active: (
            fClr: #FF7690,
            bdClr: #FF7690,
            background: transparent
        ),
        disable: (
            fClr: #D5D5D5,
            bdClr: #D5D5D5,
            background: transparent
        )
    ),
    /* 线框灰 */
    bdGrey: (
        normal: (
            fClr: #666,
            bdClr: #666,
            background: transparent
        ),
        active: (
            fClr: #666,
            bdClr: #666,
            background: transparent
        ),
        disable: (
            fClr: #D5D5D5,
            bdClr: #D5D5D5,
            background: transparent
        )
    ),
    /* 线框灰-弱 */
    bdGreyWeak: (
        normal: (
            fClr: #CCC,
            bdClr: #CCC,
            background: transparent
        ),
        active: (
            fClr: #CCC,
            bdClr: #CCC,
            background: transparent
        ),
        disable: (
            fClr: #CCC,
            bdClr: #CCC,
            background: transparent
        )
    ),
    /* 渐变绿-跑道圆 */
    gradGreenRound: (
        normal: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(-120deg, #45E7DE 0%, #58CBEF 100%)
        ),
        active: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(-120deg, #2ECCC4 0%, #42B8DD 100%)
        ),
        disable: (
            fClr: #FFF,
            bdClr: none,
            background: #D5D5D5
        )
    ),
    /* 渐变粉-跑道圆 */
    gradPinkRound: (
        normal: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(59deg, #FF5963 0%, #FF7096 100%)
        ),
        active: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(59deg, #E74751 0%, #F4547E 100%)
        ),
        disable: (
            fClr: #FFF,
            bdClr: none,
            background: #D5D5D5
        )
    ),
    /* 渐变绿 */
    gradGreen: (
        normal: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(-131deg, #3CE6D9 0%, #51D3E7 100%)
        ),
        active: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(-131deg, #34D1C5 0%, #45BCCF 100%)
        ),
        disable: (
            fClr: #FFF,
            bdClr: none,
            background: #D5D5D5
        )
    ),
    /* 渐变粉 */
    gradPink: (
        normal: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(48deg, #FF5963 0%, #FF7096 100%)
        ),
        active: (
            fClr: #FFF,
            bdClr: none,
            background: linear-gradient(46deg, #E74751 0%, #F4547E 100%)
        ),
        disable: (
            fClr: #FFF,
            bdClr: none,
            background: #D5D5D5
        )
    )
);
@mixin btnStyle ($fClr, $bdClr, $background) {
    color: $fClr;
    border-color: $bdClr;
    background: $background;
}
@each $type, $status in $btns {
    .gm-btn[type=#{$type}] {
        $normal: map-get($status, normal);
        $active: map-get($status, active);
        $disable: map-get($status, disable);
        @include btnStyle(map-values($normal)...);
        &.active {
            @include btnStyle(map-values($active)...);
        }
        &.disable {
            @include btnStyle(map-values($disable)...);
        }
    }
}

.gm-btn {
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
}
</style>
