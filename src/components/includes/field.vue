<template lang="pug">
  .field(:class="{'field_slot': $slots.default, [cls]: cls, 'hidden': type === 'hidden' }")
    .field__wrap
      span.field__label(v-if="label") {{ label }}
      input.field__input(v-model="data" @keyup="$emit('keyup', data)" :required="required" :type="type" :inputmode="type === 'number' ? 'numeric' : null" :pattern="pattern" :placeholder="placeholder" @input="$emit('input', data)")
      .field__slot
        slot
</template>

<script>
export default {
  data() {
    return {
      data: this.value
    }
  },
  watch: {
    value(val) {
      this.data = val;
    }
  },
  computed: {
    pattern() {
      let pattern = null
      if(this.type === 'number' && !this.validate) pattern = '[0-9]*'
      if(this.validate) pattern = this.validate;
      return pattern;
    }
  },
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: String
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    cls: {
      type: String
    },
    validate: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .field
    position relative
    width 100%
    box-sizing: border-box
    *
      box-sizing: border-box
    &.smart
      & ^[0]__input
        font-size 19px
    &.hidden
      width 1px
      height 1px
      overflow hidden
      opacity 0
      position absolute
      display block
    &__wrap
      position relative
    &__input
      width 100%
      border 1px solid #D3D9E2
      height 74px
      outline: none !important
      padding-left 20px
      font-size 24px
      padding-right 20px
      appearance: none !important
      -webkit-appearance none !important
      padding-top 24px
      border-radius 3px
      padding-bottom 7px
      -moz-appearance textfield !important
      .field_slot &
        padding-right 190px
    &__label
      position absolute
      left 0
      top 0
      pointer-events: none
      padding-left 20px
      font-size 14px
      padding-top 10px
      color #999
    &__slot
      position absolute
      right 10px
      bottom 10px

</style>