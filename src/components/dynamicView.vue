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
import card from "@/components/steps/card"

export default {
  components: {
    buy,
    sell,
    email,
    relictum,
    status,
    card
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