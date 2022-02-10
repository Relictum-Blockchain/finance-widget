<template lang="pug">
  .finance-content(v-if="step")
    component.finance-content__section(:is="step")
</template>

<script>
import buy from "@/components/steps/buy"
import sell from "@/components/steps/sell"
import email from "@/components/steps/email"
import relictum from "@/components/steps/relictum"
import status from "@/components/steps/status"

export default {
  components: {
    buy,
    sell,
    email,
    relictum,
    status
  },
  computed: {
    step: {
      get() {
        return this.$store.getters.getStep;
      },
      set(val) {
        this.$store.commit("setStep", val);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .finance-content
    display flex
    box-sizing: border-box
    height 100%
    position relative
    width 100%
    &__section
      width 100%
      flex-shrink 0
      box-sizing: border-box
</style>