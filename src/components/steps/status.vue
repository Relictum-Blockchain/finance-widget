<template lang="pug">
  div
    .status-page-error(v-if="error")
      span {{error}}

    .status-page(v-if="vData" :class="{'sell-status': type === 2, 'complete-status': status === 1, 'error-status': status === 2}")    
      .status-page__top

        .status-page__head
          span(v-if="type === 1") Покупка USDR за фиат и криптовалюты
          span(v-else) Продажа USDR за фиат и криптовалюты

        .status-page__status(v-if="type === 1 && status !== 2" :class="{'done-status': status === 1, 'error-status': status === 2}")
          span.status-page__status-width(:style="{width: computedTimer}")
          
          .status-page__status-content
            svg(v-if="status === 1" xmlns="http://www.w3.org/2000/svg" width="14px" height="12px" viewBox="0 0 16.156 12.117")
              path(d="M0,71.017,5.533,76.56,16.156,65.947l-1.525-1.5-9.1,9.088L1.5,69.5Z" transform="translate(0 -64.443)" fill="#fff")
          
            svg(v-else xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid')
              circle(cx='50' cy='50' fill='none' stroke='#1167e7' stroke-width='6' r='35' stroke-dasharray='164.93361431346415 56.97787143782138')
                animateTransform(attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1')
            
            .status-page__status-title 
              span(v-if="status !== 1") Ожидание оплаты...... 
              span(v-else) Успешно оплачено
            
            coutdown.status-page__status-counter(:time="tm" @timer="timer" v-if="!reboot_timer && status !== 1")
      
      .status-page__content(v-if="vData.id")
        
        .status-page__id Номер транзакции <b>{{ '#'+vData.id }}</b>

        .status-page__section(v-if="type === 2 && status === 0")
          .status-page__loader
            coutdown(:time="selltm" @timer="timer" :repeat="selltm" v-if="!reboot_timer")
          .status-page__center-caption Ожидаем подтверждения платежа…
        
        .status-page__section.status-page__ws-status(v-if="status === 2")
          svg(xmlns='http://www.w3.org/2000/svg' width='105px' height='105px')
            g(transform='translate(0 .394)')
              circle(cx='52.5' cy='52.5' r='52.5' transform='translate(0 -.395)' fill='#e67b3d')
              g(transform='translate(-203.5 165.605)')
                circle(cx='52.5' cy='52.5' r='52.5' transform='translate(204 -165.832)' fill='url(#a)')
                g(fill='#fff')
                  path(d='m235.922-139.287 46 46.964a3.548 3.548 0 0 1 0 4.95 3.374 3.374 0 0 1-4.843 0l-46-46.97a3.548 3.548 0 0 1 0-4.95 3.374 3.374 0 0 1 4.843.006Z')
                  path(d='m231.079-92.321 46-46.965a3.374 3.374 0 0 1 4.844.002 3.548 3.548 0 0 1 0 4.95L235.921-87.38a3.374 3.374 0 0 1-4.842 0 3.548 3.548 0 0 1 0-4.942Z')

          .status-page__center-caption Возникла ошибка при проведении транзакции...
        
        .status-page__section.status-page__info(v-if="vData.gate && vData.type === 1 && status !== 2")
          .status-page__info-mid
            img.status-page__info-img(v-if="vData.gate.data.icon" :src="vData.gate.data.icon", alt="")
            span.status-page__info-title {{ vData.gate.gateCurrency.code }}
            span.status-page__info-caption {{ vData.gate.gateCurrency.title }}
        
        .status-page__section(v-if="qr && type === 1 && status === 0")
          .status-page__qr
            img(:src="qr", alt="")

        .status-page__section.status-page__total(v-if="vData.sum")
          .status-page__caption 
            span(v-if="type === 1") 
              span(v-if="status === 1 || status === 2") Вы заплатили
              span(v-else) Сумма к оплате
            span(v-else) Вы получите
          .status-page__total-summ {{ vData.sum_currency }} {{ vData.gate.gateCurrency.code }}
          .status-page__caption.status-page__caption_semi(v-if="vData.type === 2")
            span(v-if="vData.gate.data.percent_fee") {{ vData.gate.data.percent_fee }}% 
            span(v-if="vData.gate.data.min_fee") ( Минимум {{ vData.gate.data.min_fee }} {{ vData.gate.gateCurrency.code }} )
        
        .status-page__section.status-page__address(v-if="vData.transaction_address")
          .status-page__caption Кошелек {{ vData.gate.gateCurrency.code }} для пополнения
          .status-page__value {{ vData.transaction_address }}
          
        .status-page__section.status-page__actions(v-if="vData.transaction_address && type === 1 && status === 0")
          a.copy-btn(:href="`https://tronscan.org/#/address/${vData.transaction_address}`" target="_blank" v-if="vData.gate.gateCurrency.code === 'USDT-TRX'")
            span Перейте в Tronscan
          a.copy-btn(:href="`https://etherscan.org/#/address/${vData.transaction_address}`" target="_blank" v-if="vData.gate.gateCurrency.code === 'USDT'")
            span Перейте в Etherscan
          copy.copy-btn(:text="vData.transaction_address")

        .status-page__section.status-page__transaction(v-if="vData.sum || vData.data.relictum")
          .status-page__cell(v-if="vData.sum")
            .status-page__caption 
              span(v-if="type === 1") 
                span(v-if="status === 1 || status === 2") Вы получили
                span(v-else) Вы получите
              span(v-else) Вы продаете
            .status-page__summ {{ vData.sum }} USDR
            .status-page__caption.status-page__caption_semi(v-if="vData.gate.rate") {{ vData.gate.rate }} {{ vData.gate.gateCurrency.code }} за 1 USDR
          .status-page__cell(v-if="vData.data.relictum")
            .status-page__caption Адрес получения
            .status-page__value {{ vData.data.relictum }}
            .status-page__mt
              a.copy-btn(target="_blank" :href="`https://relictum.pro/explorer/main/address/${vData.data.relictum}`")  
                span Перейти в explorer
            
        .status-page__section(v-if="simplex && status === 0")
          form(:action="simplex.action" method="POST")
            input(type="hidden" v-for="(val, key) in simplex.fields" :value="val" :name="key" v-if="key !== 'return_url_success' && key !== 'return_url_fail'")
            input(type="hidden" name="return_url_success" :value="currentUrl+'&forceStatus=1'")
            input(type="hidden" name="return_url_fail" :value="currentUrl+'&forceStatus=2'")
            btn(type="submit" caption="Перейти к оплате")
            span.status-page__caption.status-page__caption_center.status-page__caption_semi Вы будете перенаправлены на страницу мерчанта

        .status-page__footer(v-if="status === 0")
          b.status-page__footer-title Внимание
          ul.status-page__footer-list
            li Переведите на этот адрес только {{ vData.gate.gateCurrency.title }} <span v-if="vData.gate.data.networks">({{ vData.gate.data.networks[0] }})</span>. Если вы отправите на этот адрес другую криптовалюту, она может быть потеряна навсегда.
            li Сделка будет зачислена не ранее, чем после 3 сетевых подтверждений.

        .status-page__footer-btn(v-if="status === 1")
          a.status-page__clean-btn(href="https://relictum.finance/auth/signin" target="_blank")
            span История транзакций

        .status-page__footer-btn(v-if="status === 2")
          a.status-page__clean-btn(href="" @click.prevent="resetForm()" target="_blank")
            span Вернуться на главную

</template>

<script>
import coutdown from "@/components/includes/coutdown"
import copy from "@/components/includes/copy"
import QRCode from 'qrcode'

export default {
  data() {
    return {
      timeScetcher: 0,
      tm: 900,
      selltm: 60,
      qr: null,
      reboot_timer: false
    }
  },
  components: {
    coutdown, copy
  },
  watch: {
    status: {
      handler() {
        this.qrGenerate();
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch("checkStatus", this.$route.query.statusid)
  },
  computed: {
    currentUrl() {
      return window.location.href+"&notify=simplex";
    },
    error() {
      return this.$store.getters.getError
    },
    vData() {
      return this.$store.getters.getStatusData ? this.$store.getters.getStatusData.transaction : null
    },
    type() {
      return this.$store.getters.getStatusData ? this.vData.type : null
    },
    status() {
      if(this.$route.query.forceStatus && this.vData.status === 0) return parseInt(this.$route.query.forceStatus);
      return this.$store.getters.getStatusData ? this.vData.status : null
    },
    simplex() {
      return this.$store.getters.getStatusData ? this.$store.getters.getStatusData.form : null
    },
    computedTimer() {
      return (100 - (this.timeScetcher / this.tm * 100)) + "%" || 0;
    }
  },
  methods: {
    rebootTimer() {
      this.reboot_timer = true;
      this.$nextTick(() => {
        this.reboot_timer = false;
      }) 
    },
    timer(val) {
      if(val === 0) {
        this.$store.dispatch("checkStatus", this.$route.query.statusid);
        this.rebootTimer();
      }
      this.timeScetcher = val;
    },
    resetForm() {
      this.$store.dispatch("resetForm");
    },
    qrGenerate() {
      if(!this.vData || !this.vData.data.qr_link) return;
      QRCode.toDataURL(this.vData.data.qr_link).then(url => {
        this.qr = url;
      })
    }
  }
}
</script>