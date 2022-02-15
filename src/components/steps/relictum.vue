<template lang="pug">
  .relictum-page
    head-section(title="Введите USDR адрес кошелька" to="email")
    .relictum-page__caption Чтобы продолжить, у вас должна быть установлна нода Relictum и создан кошелек USDR.
    .relictum-page__field
      field(label="Адрес кошелька USDR" required="required" cls="smart" placeholder="Введите USDR адрес кошелька" v-model="relictum" type="text")
    
    .relictum-page__info
      .relictum-page__info-img
        img(:src="`${$domain}/assets/images/node.png`", alt="alt")
      b.relictum-page__info-title У вас еще нет приложения?
      span.relictum-page__info-text Скачайте ноду для любой платформы прямо сейчас!
      a.relictum-page__info-btn(href="https://relictum.pro/downloads" target="_blank") 
        img(:src="`${$domain}/assets/icons/relictum_logo2.svg`", alt="alt")
        span Скачать ноду
    
    .relictum-page__error(v-if="error")
      span {{ error }}
    .relictum-page__btn
      btn(caption="Продолжить" :disabled="buttonValidate" @click.native="sendRelictum()")
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