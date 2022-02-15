<template lang="pug">
  .finance-float(v-if="apiKey")
    
    .finance-float__typer(v-if="type === 'modal'")
      .finance-float__bpos
        button.finance-float__button(@click="open = !open, notify = false" :class="{'active': open, 'notify': notify}")
          .finance-float__button-wrap
            img(src="https://relictum.finance/assets/icons/relictum_finance.svg", alt="alt")
      transition(name="fade-fs")
        .finance-float__widget(v-if="open && type === 'modal'")
          .finance-float__widget-wrap
            button.finance-float__close(@click="open = false")
              svg(style='enable-background:new 0 0 24 24;' version='1.1' viewBox='0 0 24 24' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink')
                path(d='M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z' fill='currentColor')
            widget
    .finance-float__typer(v-else)
      widget


</template>

<script>
import widget from "@/components/widget"

export default {
  components: {
    widget
  },
  data() {
    return {
      open: false,
      notify: false
    }
  },
  
  mounted() {
    if(!this.apiKey) return;
    this.$store.commit("setKey", this.apiKey);
    this.$store.dispatch("fetchGates");

    if(this.$route.query.statusid) {
      this.step = 'status';
      if(this.$route.query.notify === 'simplex') this.notify = true;
    }
  },
  props: {
    apiKey: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "modal"
    },
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
font_url = "https://dev.relictum.finance/assets/fonts/"

@font-face
  font-family: "Cochin";
  src: url(font_url+"Cochin-Bold.woff2") format("woff2"), url(font_url+"Cochin-Bold.woff") format("woff")
  font-weight: bold;
  font-style: normal;
  font-display: swap;

@font-face
  font-family "Sero Pro"
  src url(font_url+"SeroPro.woff2") format("woff2"), url(font_url+"SeroPro.woff") format("woff")
  font-weight 400
  font-style normal
  font-display swap

@font-face
  font-family "Sero Pro"
  src url(font_url+"SeroPro-Medium.woff2") format("woff2"), url(font_url+"SeroPro-Medium.woff") format("woff")
  font-weight 500
  font-style normal
  font-display swap
</style>