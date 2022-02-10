<template lang="pug">
  transition(name="fade")
    .loading(v-if="on" :class="stl")
      svg(xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 70.801 81.132")
        defs
          linearGradient#left-to-right(gradientTransform="rotate(90)")
            stop(offset="0" stop-color="#1167e7")
              animate(dur="3s" values="0;1;1;0;0" repeatCount="indefinite" attributeName="offset" fill="freeze")
            stop(offset="0" stop-color="transparent")
              animate(dur="3s" values="0;1;1;0;0" repeatCount="indefinite" attributeName="offset" fill="freeze")
        path(d="M35.408,0h0Q53.118,10.1,70.783,20.28c.021,13.516,0,27.034.018,40.553Q53.627,70.69,36.444,80.524a5.879,5.879,0,0,0-.806.608H35.3c-4.422-2.695-8.974-5.184-13.453-7.787Q10.919,67.092,0,60.812V20.333C2.217,18.95,4.521,17.713,6.778,16.4Q21.092,8.194,35.408,0m27.05,21.261a35.53,35.53,0,0,0-4.346,1.91c-6.389,3.031-12.843,5.922-19.25,8.914a8.3,8.3,0,0,1-6.835.06q-9.478-4.359-18.96-8.718a4.93,4.93,0,0,0-2.9-.77,3.76,3.76,0,0,0-2.63,5.517,3.842,3.842,0,0,0,1.75,1.437c6.384,2.911,12.749,5.864,19.13,8.786a5.833,5.833,0,0,1,3.37,5.434c-.01,6.433.005,12.866-.013,19.3a5.041,5.041,0,0,0,.441,2.768,3.715,3.715,0,0,0,4.278,1.565,3.41,3.41,0,0,0,2.473-3.3q-.016-10.3,0-20.609A5.742,5.742,0,0,1,42.29,38.4c4.844-2.2,9.658-4.458,14.507-6.642a2.344,2.344,0,0,1,2.549.185,3.77,3.77,0,0,1,.85,2.744c.016,4.7-.023,9.394.018,14.09a3.109,3.109,0,0,0,3.712,2.755,3.018,3.018,0,0,0,2.617-3.005c-.008-8.186.023-16.375-.016-24.561A3.158,3.158,0,0,0,62.458,21.261Z" fill="url(#left-to-right)")
</template>

<script>
export default {
  props: {
    on: {
      type: Boolean,
    },
    stl: {
      type: String,
    },
  },
};
</script>

<style lang="stylus" scoped>
.loading
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  display block
  background-color alpha(#fff, 0.5)
  display flex
  align-items center
  justify-content center
  z-index 20
  user-select: none
  svg
    width 100px !important
    height 100px !important
    position relative
  &.transparent
    background-color transparent
</style>