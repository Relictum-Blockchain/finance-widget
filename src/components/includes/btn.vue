<template lang="pug">
  button.btn(:disabled="disabled")
    span {{ caption }}
</template>
<script>
export default {
  props: {
    caption: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn
  border 0
  outline: none !important
  box-sizing: border-box
  width 100%
  color #fff
  background-color #1167e7
  font-size 16px
  padding 17px
  cursor pointer
  user-select: none
  transition all 0.25s ease
  border-radius 3px
  &:hover
    transform scale(1.01)
  &:disabled
    pointer-events: none
    opacity 0.5
</style>