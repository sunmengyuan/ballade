<template>
    <a href="javascript:;" class="gm-btn"></a>
</template>

<script>
export default {
    props: {

    }
}
</script>

<style lang="scss" scoped>
$btns: (
    /* 纯色绿 */
    pureGreen: (
        normal: (
            font: #FFF,
            border: none,
            background: #3ADBD2
        ),
        active: (
            font: #FFF,
            border: none,
            background: #1FB2A7
        ),
        disable: (
            font: #FFF,
            border: none,
            background: #D5D5D5
        )
    ),
    /* 纯色粉 */
    purePink: (
        normal: (
            font: #FFF,
            border: none,
            background: #FF7690
        ),
        active: (
            font: #FFF,
            border: none,
            background: #E75873
        ),
        disable: (
            font: #FFF,
            border: none,
            background: #D5D5D5
        )
    ),
    /* 纯色灰 */
    pureGrey: (
        normal: (
            font: #666,
            border: #E5E5E5,
            background: #F5F5F5
        ),
        active: (
            font: #666,
            border: #E5E5E5,
            background: #E5E5E5
        ),
        disable: (
            font: #FFF,
            border: #D5D5D5,
            background: #D5D5D5
        )
    ),
    /* 线框绿 */
    bdGreen: (
        normal: (
            font: #3ADBD2,
            border: #3ADBD2,
            background: transparent
        ),
        active: (
            font: #3ADBD2,
            border: #3ADBD2,
            background: transparent
        ),
        disable: (
            font: #D5D5D5,
            border: #D5D5D5,
            background: transparent
        )
    ),
    /* 线框粉 */
    bdPink: (
        normal: (
            font: #FF7690,
            border: #FF7690,
            background: transparent
        ),
        active: (
            font: #FF7690,
            border: #FF7690,
            background: transparent
        ),
        disable: (
            font: #D5D5D5,
            border: #D5D5D5,
            background: transparent
        )
    )
    /* 线框灰 */
    bdGrey: (
        normal: (
            font: #666,
            border: #666,
            background: transparent
        ),
        active: (
            font: #666,
            border: #666,
            background: transparent
        ),
        disable: (
            font: #D5D5D5,
            border: #D5D5D5,
            background: transparent
        )
    ),
    /* 线框灰-弱 */
    bdGreyWeak: (
        normal: (
            font: #CCC,
            border: #CCC,
            background: transparent
        ),
        active: (
            font: #CCC,
            border: #CCC,
            background: transparent
        ),
        disable: (
            font: #CCC,
            border: #CCC,
            background: transparent
        )
    ),
    /* 渐变绿-跑道圆 */
    gradGreenRound: (
        normal: (
            font: #FFF,
            border: none,
            background: ,
        ),
        active: (
            font: #FFF,
            border: none,
            background: ,
        ),
        disable: (
            font: #FFF,
            border: none,
            background: ,
        )
    ),
    /* 渐变粉-跑道圆 */
    gradPinkRound: (
        normal: (
            font: #FFF,
            border: none,
            background: ,
        ),
        active: (
            font: #FFF,
            border: none,
            background: ,
        ),
        disable: (
            font: #FFF,
            border: none,
            background: ,
        )
    ),
    /* 渐变绿 */
    gradGreen: (
        normal: (
            font: #FFF,
            border: none,
            background: ,
        ),
        active: (
            font: #FFF,
            border: none,
            background: ,
        ),
        disable: (
            font: #FFF,
            border: none,
            background: ,
        )
    ),
    /* 渐变粉 */
    gradPink: (
        normal: (
            font: #FFF,
            border: none,
            background: ,
        ),
        active: (
            font: #FFF,
            border: none,
            background: ,
        ),
        disable: (
            font: #FFF,
            border: none,
            background: ,
        )
    )
)
</style>
