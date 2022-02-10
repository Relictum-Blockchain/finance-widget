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

<style lang="stylus" scoped>
.relictum-page
  &__error
    text-align center
    display block
    margin-bottom 10px
    color #ff0000
    font-size 14px
  &__caption
    font-size 14px
    margin-bottom 15px
    display block
    line-height 1.35
  &__field
    margin-bottom 25px
  &__info
    border 1px solid #E7EAED
    border-radius 8px
    text-align center
    padding 20px
    margin-bottom 25px
    &-img
      margin-bottom 25px
      img
        display inline-block
    &-title
      font-size 16px
      display block
      font-weight 700
      margin-bottom 10px
    &-text
      font-size 14px
      color #485d7d
      margin-bottom 20px 
      display block
    &-btn
      border-radius: 0.3rem;
      background: #fff;
      box-shadow: 0 0.3rem 0.6rem rgba(72,93,125,0.2);
      padding: 0.8rem 2rem 0.9rem;
      font-size: 16px
      color: #1167e7;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: 0.3s all ease;
      transform: perspective(1px) translateZ(0);
      img
        margin-right 10px
        flex-shrink 0
      &:hover
        transform: perspective(1px) translateZ(0) scale(1.05)
</style>