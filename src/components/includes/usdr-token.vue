<template lang="pug">
  .usdr-token
    .usdr-token__img
      svg(xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 26 26')
        defs
          linearGradient#linear-gradient(x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox')
            stop(offset='0' stop-color='#1167e7')
            stop(offset='1' stop-color='#0844db')
        g(transform='translate(0.313)')
          circle(cx='13' cy='13' r='13' transform='translate(-0.313)' fill="url(#linear-gradient)")
          path#sign(d='M7.306,0h0q3.653,2.085,7.3,4.184c0,2.789,0,5.578,0,8.367q-3.544,2.034-7.089,4.063a1.213,1.213,0,0,0-.166.125H7.284c-.912-.556-1.852-1.07-2.776-1.607Q2.253,13.843,0,12.547V4.2c.458-.285.933-.54,1.4-.812Q4.352,1.691,7.306,0m5.581,4.387a7.331,7.331,0,0,0-.9.394C10.672,5.406,9.34,6,8.018,6.62a1.712,1.712,0,0,1-1.41.012L2.7,4.834a1.017,1.017,0,0,0-.6-.159.776.776,0,0,0-.543,1.138.793.793,0,0,0,.361.3c1.317.6,2.63,1.21,3.947,1.813a1.2,1.2,0,0,1,.7,1.121c0,1.327,0,2.655,0,3.982a1.04,1.04,0,0,0,.091.571.767.767,0,0,0,.883.323.7.7,0,0,0,.51-.68q0-2.126,0-4.252a1.185,1.185,0,0,1,.686-1.064c1-.454,1.993-.92,2.993-1.37a.484.484,0,0,1,.526.038.778.778,0,0,1,.175.566c0,.969,0,1.938,0,2.907a.641.641,0,0,0,.766.568.623.623,0,0,0,.54-.62c0-1.689,0-3.379,0-5.068A.651.651,0,0,0,12.887,4.387Z' transform='translate(5.443 4.688)' fill='#fff')
    .usdr-token__name USDR
</template>
<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.usdr-token
  display flex
  align-items center
  height 42px
  background-color #F0F2F4
  padding-left 10px
  padding-right 10px
  border-radius 4px
  font-weight 600
  color #35495e
  &__img
    width 24px
    height 24px
    margin-right 8px
    img
      width 100%
      height 100%
  &__name
    font-size 17px
    display block
    line-height 1
</style>