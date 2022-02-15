<template lang="pug">
  .buy-section(v-if="currentGate")
    .buy-section__caption Продажа USDR за Фиат и Криптовалюту
    .buy-section__cell
      field(v-model="pay" @input="payFieldMethod"  type="number" placeholder="0" label="Вы продаете")
        usdr-token

    .buy-section__cell.buy-section__cell_center
      svg(xmlns="http://www.w3.org/2000/svg" width="11" height="11.871" viewBox="0 0 11 11.871")
        g(transform="translate(-485.5 -875)")
          g(transform="translate(360.751 47)")
            path(d="M10859.5-6482.134l0,0-5.5-5.5,1.376-1.373,4.124,4.125,4.125-4.125,1.375,1.373-5.494,5.5Z" transform="translate(-10729.25 7322)" fill="#1167e7")
          rect(width="2" height="10" transform="translate(490 875)" fill="#1167e7")
    .buy-section__cell
      field(v-model="get" placeholder="0" type="number" @input="getFieldMethod" label="Вы получаете")
        gate-select(:gates="gates" v-model="currentGate")
      

    .buy-section__cell
      .buy-section__flist
        .buy-section__flist-cell(v-if="currentGate.info.data.percent_fee || currentGate.info.data.min_fee")
          span.buy-section__flist-left Комиссия
          span.buy-section__flist-right
            span(v-if="currentGate.info.data.percent_fee && currentGate.info.data.percent_fee > 0") <b>{{ currentGate.info.data.percent_fee }}% </b>
            span(v-if="currentGate.info.data.percent_fee && currentGate.info.data.min_fee")  но не менее
            span(v-if="currentGate.info.data.min_fee && currentGate.info.data.min_fee > 0") <b> {{ currentGate.info.data.min_fee }} {{ currentGate.name }}</b>
        .buy-section__flist-cell
          span.buy-section__flist-left Цена
          span.buy-section__flist-right {{ currentGate.info.rate }} {{ currentGate.name }} за 1 USDR
        .buy-section__flist-cell(v-if="currentGate.info.min_sum")
          span.buy-section__flist-left Минимум
          span.buy-section__flist-right {{ currentGate.info.min_sum }} USDR
        .buy-section__flist-cell(v-if="currentGate.info.max_sum")
          span.buy-section__flist-left Максимум
          span.buy-section__flist-right {{ currentGate.info.max_sum }} USDR
    .buy-section__button
      btn(:caption="`Продажа USDR за ${currentGate.name}`" :disabled="buttonValidate" @click.native="step = 'email', selectedStep = 'sell'")
</template>

<script>
import gateSelect from "@/components/includes/gate-select.vue";
import usdrToken from "@/components/includes/usdr-token.vue";
export default {
  components: {
    gateSelect,
    usdrToken
  },
  watch: {
    currentGate: {
      deep: true,
      handler() {
        this.payFieldMethod()
      }
    }
  },
  computed: {
    gates() {
      return this.$store.getters.getOutGates
    },
    buttonValidate() {
      let invalid = false;
      if(!this.pay || !this.get || this.pay < this.currentGate.info.data.min_fee || this.get == 0 ) invalid = true;
      if(this.pay > this.currentGate.info.max_sum || this.pay < this.currentGate.info.min_sum) invalid = true
      return invalid;
    },

    computedError() {
      let compError = "";
      if(this.pay && this.pay > this.currentGate.info.max_sum) compError = "Максимальная сумма продажи не должна превышать <br>" + this.currentGate.info.max_sum + " USDR";
      if(this.pay && this.pay > 0 && this.pay < this.currentGate.info.min_sum) compError = "Минимальная сумма продажи не должна быть меньше <br>" + this.currentGate.info.min_sum + " USDR";
      return compError;
    },
    pay: {
      get() {
        return this.$store.getters.getSellPaySumm
      },
      set(val) {
        this.$store.commit("setSellPaySumm", val)
      }
    },
    get: {
      get() {
        return this.$store.getters.getSellGetSumm
      },
      set(val) {
        this.$store.commit("setSellGetSumm", val)
      }
    },

    currentGate: {
      get() {
        return this.$store.getters.getCurrentOutGate;
      },
      set(val) {
        this.$store.commit('setCurrentOutGate', val);
      }
    },
    selectedStep: {
      get() {
        return this.$store.getters.getSelectedStep;
      },
      set(val) {
        this.$store.commit("setSelectedStep", val);
      }
    },
    step: {
      get() {
        return this.$store.getters.getStep;
      },
      set(val) {
        this.$store.commit("setStep", val);
      },
    },
    fee() {
      let fee = 0;
      if(this.currentGate.info.data.percent_fee) fee = this.pay * (this.currentGate.info.data.percent_fee / 100) * this.currentGate.info.rate;
      if(this.currentGate.info.data.min_fee) fee = fee > this.currentGate.info.data.min_fee ? fee : this.currentGate.info.data.min_fee;
      return fee;
    }
  },
  methods: {
    payFieldMethod() {
      this.pay = Number(this.pay);
      this.get = this.pay;
      this.get = (this.pay - this.fee) / this.currentGate.info.rate;
      if(this.pay < this.currentGate.info.data.min_fee) {
        this.get = 0;
      }
      this.get = this.get.toFixed(2).replace(/\.0+$/,'')
    },
    getFieldMethod() {
      this.get = Number(this.get);
      this.pay = this.get;
      this.pay = (this.get + this.fee) * this.currentGate.info.rate;
      this.pay = this.pay.toFixed(2).replace(/\.0+$/,'')
    }

  }
}
</script>