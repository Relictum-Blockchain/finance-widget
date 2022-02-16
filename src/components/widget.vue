<template lang="pug">
  .finance-widget
    loading(:on="$store.getters.getLoading")
    .finance-widget__box
      .finance-widget__head(v-if="step === 'buy' || step === 'sell'")
        button.finance-widget__head-btn(@click="step = 'buy'" :class="{'active': step === 'buy'}") {{ $t('h_buying') }}
        button.finance-widget__head-btn(@click="step = 'sell'" :class="{'active': step === 'sell'}") {{ $t('h_selling') }}    
      .finance-widget__content
        dynamic-view
</template>

<script>
import loading from "@/components/includes/loading"
import DynamicView from "@/components/dynamicView"
export default {
  components: {
    DynamicView, loading
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