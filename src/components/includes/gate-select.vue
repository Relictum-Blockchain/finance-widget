<template lang="pug">
  multiselect.buy-select(v-if="gates.length" v-model="currentGate" placeholder="Выберите вариант" track-by="name" label="name" :show-labels="false" :options="gates" :allow-empty="false")
    template(slot="singleLabel", slot-scope="{ option }")
      .buy-select__option
        .buy-select__option-img
          img(:src="option.info.data.icon", alt="alt")
        .buy-select__option-info
          b.buy-select__option-title {{ option.name }}
    template(slot="option", slot-scope="props")
      .buy-select__option
        .buy-select__option-img
          img(:src="props.option.info.data.icon", alt="alt")
        .buy-select__option-info
          b.buy-select__option-title {{ props.option.name }}
          span.buy-select__option-caption {{ props.option.info.title }}
</template>

<script>
export default {
  computed: {
    currentGate: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  props: {
    value: {
      type: Object,
      requred: true,
    },
    gates: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.buy-select
  &__option
    display flex
    align-items center
    &-img
      width 24px
      height 24px
      border-radius 50%
      flex-shrink 0
      margin-right 10px
      img
        width 100%
        height 100%
    &-title 
      display block
      font-size 17px
      line-height 1
    &-caption
      font-size 12px
      display block
      color #999
      margin-top 3px
      .multiselect__option--highlight &
        color #fff
  .multiselect__tags
    border 0 !important
</style>