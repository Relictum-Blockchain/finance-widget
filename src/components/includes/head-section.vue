<template lang="pug">
  .head-section
    button.head-section__btn(@click="step = to")
      svg(xmlns="http://www.w3.org/2000/svg" width="9.576" height="16.898" viewBox="0 0 9.576 16.898")
        g(transform="translate(-109.25 -65.63)")
          path(d="M118.506,67.5a1.094,1.094,0,0,0-1.588-1.5l-7.355,7.271a1.162,1.162,0,0,0,0,1.588l7.355,7.355c1,1,2.591-.585,1.588-1.588L111.987,74.1Z" transform="translate(0 0)" fill="currentColor")
    .head-section__title {{ title }}
    .head-section__btn


</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "buy"
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    step: {
      get() {
        return this.$store.getters.getStep;
      },
      set(val) {
        this.$store.commit("setStep", val);
      },
    },
  }
}
</script>