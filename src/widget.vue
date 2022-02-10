<template lang="pug">
  .finance-widget
    loading(:on="$store.getters.getLoading")
    .finance-widget__head(v-if="step === 'buy' || step === 'sell'")
      button.finance-widget__head-btn(@click="step = 'buy'" :class="{'active': step === 'buy'}") Покупка
      button.finance-widget__head-btn(@click="step = 'sell'" :class="{'active': step === 'sell'}") Продажа   
    .finance-widget__content
      dynamic-view
</template>

<script>
import DynamicView from "@/components/dynamicView"
import loading from "@/components/includes/loading"
export default {
  components: {
    DynamicView, loading
  },
  mounted() {
    this.$store.dispatch("fetchGates");

    if(this.$route.query.statusid) this.step = 'status';
  },
  watch: {
    step: {
      deep: true,
      handler() {
        this.$store.commit("setError", null);
      }
    }
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
.finance-widget
  box-sizing border-box
  max-width 432px
  min-height 492px
  display flex
  flex-direction column
  margin-left auto
  font-family Arial, sans-serif
  margin-right auto
  position relative
  font-size 14px
  background-color #fff
  border 1px solid #E2E5EA
  *
    box-sizing: border-box
  &__content
    padding 20px
    flex-grow 1
    display flex
  &__head
    display flex
    &-btn
      flex-grow 1
      width 50%
      transition all 0.25s ease
      cursor pointer
      border 0
      font-size 17px
      height 64px
      font-weight 600
      outline: none !important
      text-shadow: none
      background-color transparent
      box-shadow inset 0px -1px 0px #E2E5EA
      color #6167a6
      &.active
        color #1169e9
        box-shadow: inset 0px -2px 0px #1169e9
  

</style>
