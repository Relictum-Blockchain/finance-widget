<template lang="pug">
  .relictum-page
    head-section(:title="$t('write_address_usdr')" to="email")
    .relictum-page__caption {{ $t("for_continue_relictum") }}
    .relictum-page__field
      field(:label="$t('wallet_usdr_address')" required="required" cls="smart" :placeholder="$t('write_address_usdr')" v-model="relictum" type="text")
    
    .relictum-page__info
      .relictum-page__info-img
        img(:src="`${$domain}/assets/images/node.png`", alt="alt")
      b.relictum-page__info-title {{ $t("dont_have_app") }}
      span.relictum-page__info-text {{ $t("download_node_now")}}
      a.relictum-page__info-btn(href="https://relictum.pro/downloads" target="_blank") 
        img(:src="`${$domain}/assets/icons/relictum_logo2.svg`", alt="alt")
        span {{ $t("download_app") }}
    
    .relictum-page__error(v-if="error")
      span {{ error }}
    .relictum-page__btn
      btn(:caption="$t('accept_next')" :disabled="buttonValidate" @click.native="sendRelictum()")
</template>

<script>
export default {
  computed: {
    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(value) {
        this.$store.commit('setError', value);
      }
    },
    relictum: {
      get() {
        return this.$store.getters.getRelictum;
      },
      set(value) {
        this.$store.commit('setRelictum', value);
      }
    },
    buttonValidate() {
      return !this.relictum;
    }
  },
  methods: {
    async sendRelictum() {
      await this.$store.dispatch('checkRelictumAddress', this.relictum);
    }
  }
}
</script>