<template lang="pug">
  .status-page(v-if="status")    
    .status-page__top(v-if="status.transaction")
      .status-page__head 
        span Купить USDR за фиат и криптовалюты
      .status-page__status
        span.status-page__status-width(:style="{width: computedTimer}")
        .status-page__status-content
          svg(xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid')
            circle(cx='50' cy='50' fill='none' stroke='#1167e7' stroke-width='6' r='35' stroke-dasharray='164.93361431346415 56.97787143782138')
              animateTransform(attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1')
          .status-page__status-title Ожидание оплаты...... 
          coutdown.status-page__status-counter(:time="tm" @timer="timer")
    
    .status-page__content(v-if="status.transaction && status.transaction.id")
      
      .status-page__id Номер транзакции <b>{{ '#'+status.transaction.id }}</b>
      
      .status-page__section.status-page__info(v-if="status.transaction.gate")
        .status-page__info-mid
          img.status-page__info-img(v-if="status.transaction.gate.data.icon" :src="status.transaction.gate.data.icon", alt="")
          span.status-page__info-title {{ status.transaction.gate.gateCurrency.code }}
          span.status-page__info-caption {{ status.transaction.gate.gateCurrency.title }}
      
      .status-page__section.status-page__total(v-if="status.transaction.sum")
        .status-page__caption Сумма к оплате
        .status-page__total-summ {{ status.transaction.sum_currency }} {{ status.transaction.gate.gateCurrency.code }}
      
      .status-page__section.status-page__address(v-if="status.transaction.transaction_address")
        .status-page__caption Кошелек {{ status.transaction.gate.gateCurrency.code }} для пополнения
        .status-page__value {{ status.transaction.transaction_address }}
        
      .status-page__section.status-page__actions(v-if="status.transaction && status.transaction.transaction_address")
        a.copy-btn(:href="`https://tronscan.org/#/address/${status.transaction.transaction_address}`" target="_blank" v-if="status.transaction.gate.gateCurrency.code === 'USDT-TRX'")
          span Перейте в Tronscan
        a.copy-btn(:href="`https://etherscan.org/#/address/${status.transaction.transaction_address}`" target="_blank" v-if="status.transaction.gate.gateCurrency.code === 'USDT'")
          span Перейте в Etherscan
        copy.copy-btn(:text="status.transaction.transaction_address")

      .status-page__section.status-page__transaction
        .status-page__cell(v-if="status.transaction.sum")
          .status-page__caption Вы получите
          .status-page__summ {{ status.transaction.sum }} USDR
          .status-page__caption.status-page__caption_semi(v-if="status.transaction.gate.rate") {{ status.transaction.gate.rate }} {{ status.transaction.gate.gateCurrency.code }} за 1 USDR
        .status-page__cell(v-if="status.transaction.data.relictum")
          .status-page__caption Адрес вашего USDR кошелька
          .status-page__value {{ status.transaction.data.relictum }}
          .status-page__mt
            a.copy-btn(target="_blank" :href="`https://relictum.pro/explorer/main/address/${status.transaction.data.relictum}`")  
              span Перейти в explorer
      
      .status-page__footer
        b.status-page__footer-title Внимание
        ul.status-page__footer-list
          li Переведите на этот адрес только {{ status.transaction.gate.gateCurrency.title }} ({{ status.transaction.gate.data.networks[0] }}). Если вы отправите на этот адрес другую криптовалюту, она может быть потеряна навсегда.
          li Сделка будет зачислена не ранее, чем после 3 сетевых подтверждений.
    jp(:data="status")
</template>

<script>
import coutdown from "@/components/includes/coutdown"
import copy from "@/components/includes/copy"

export default {
  data() {
    return {
      timeScetcher: 0,
      tm: 900
    }
  },
  components: {
    coutdown, copy
  },
  mounted() {
    this.$store.dispatch("checkStatus", this.$route.query.statusid)
  },
  computed: {
    status() {
      return this.$store.getters.getStatusData;
    },
    computedTimer() {
      return (100 - (this.timeScetcher / this.tm * 100)) + "%";
    },
  },
  methods: {
    timer(val) {
      this.timeScetcher = val;
    }
  }
}
</script>

<style lang="stylus" scoped>

  .copy-btn
    box-sizing: border-box;
    border-radius: 4px;
    cursor pointer
    background-color: #ECF3FD
    padding: 7px 12px;
    font-weight: 500;
    font-size: 14px;
    outline none !important
    border 0
    box-shadow: none
    color: #1167e7;
    text-decoration none
    display: inline-block;
    transition: 0.3s all ease;
    transform: perspective(1px) translateZ(0);
    &:hover
      transform: scale(1.02) perspective(1px) translateZ(0);
    &.done
      background-color #9cd166
      color #fff

  .status-page
    color #212f41
    &__footer
      border-top 1px solid #E2E5EA
      padding-top 20px
      margin-left -20px
      margin-right -20px
      padding-left 20px
      padding-right 20px
      &-title
        font-size 16px
        display block
      &-list
        padding 0
        margin-left 20px
        font-size 13px
        li
          margin-bottom 10px
          &:last-child
            margin-bottom 0px

    &__transaction
      margin-left -20px
      margin-right -20px
      background-color #f5f6f8
      padding-left 20px
      padding-right 20px
    &__mt
      margin-top 10px
    &__cell
      padding-top 15px
      padding-bottom 15px
      border-bottom 1px solid #E2E5EA
      &:last-child
        border-bottom 0
    &__summ
      font-weight 700
      font-size 24px
    &__actions
      display flex
      flex-wrap wrap
      margin-bottom -12px
      align-items flex-start
      & > *
        margin-right 12px
        margin-bottom 12px
    &__copy
      margin-top 10px
    &__caption
      color #485d7d
      font-size 14px
      display block
      margin-bottom 5px
      &_semi
        margin-top 5px
        margin-bottom 0
    &__value
      word-break: break-word;
      color #212f41
      font-size 16px
      font-weight 700
    &__section
      margin-bottom 20px
    &__total
      text-align center
      &-summ
        font-size 30px
        display block
        color #212f41
    &__info
      display flex
      align-items center
      justify-content center
      &-mid
        display inline-flex
        align-items center
        flex-wrap wrap
        text-align center
        padding-left 34px
        position relative
        text-align left
      &-img
        width 24px
        height 24px
        border-radius 50%
        overflow hidden
        margin-right 10px
        position absolute
        left 0
        top 50%
        margin-top -13px
        flex-shrink 0
      &-title
        font-weight 700
        margin-right 10px
        display block
        font-size 16px
      &-caption
        color #999
        font-size 14px
    &__head
      padding 0 20px 20px 20px
      text-align center
      font-size 16px
      font-weight 700
      display block
    &__id
      display block
      text-align center
      font-size 14px
      margin-bottom 20px
    &__status
      margin-left -20px
      margin-right -20px
      position relative
      display flex
      margin-bottom 20px
      background-color #ecf3fd
      &-counter
        margin-left auto
      &-content
        display flex
        align-items center
        padding 10px 20px
        width 100%
        position relative
        z-index 2
      svg
        width 25px
        height 25px
        margin-right 10px
      &-width
        position absolute
        left 0
        transition width 0.1s ease
        top 0
        height 100%
        background-color #cddcf2
        z-index 1
</style>