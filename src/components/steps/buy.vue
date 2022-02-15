<template lang="pug">
  .buy-section(v-if="currentGate")
    .buy-section__caption Покупка USDR за Фиат и Криптовалюту
    .buy-section__cell
      field(v-model="pay" placeholder="0" type="number" @input="payFieldMethod" label="Вы платите")
        gate-select(:gates="gates" v-model="currentGate")
    .buy-section__cell.buy-section__cell_center
      svg(xmlns="http://www.w3.org/2000/svg" width="11" height="11.871" viewBox="0 0 11 11.871")
        g(transform="translate(-485.5 -875)")
          g(transform="translate(360.751 47)")
            path(d="M10859.5-6482.134l0,0-5.5-5.5,1.376-1.373,4.124,4.125,4.125-4.125,1.375,1.373-5.494,5.5Z" transform="translate(-10729.25 7322)" fill="#1167e7")
          rect(width="2" height="10" transform="translate(490 875)" fill="#1167e7")
    .buy-section__cell
      field(v-model="get" @input="getFieldMethod" type="number" placeholder="0" label="Вы покупаете")
        usdr-token

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
      btn(:caption="`Покупка USDR за ${currentGate.name}`" :disabled="buttonValidate" @click.native="step = 'email', selectedStep = 'buy'")
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
    selectedStep: {
      get() {
        return this.$store.getters.getSelectedStep;
      },
      set(val) {
        this.$store.commit("setSelectedStep", val);
      }
    },
    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(val) {
        this.$store.commit("setError", val);
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
    buttonValidate() {
      let invalid = false;
      if(!this.pay || !this.get || this.pay < this.currentGate.info.data.min_fee || this.get == 0 ) invalid = true
      if(this.get > this.currentGate.info.max_sum || this.get < this.currentGate.info.min_sum) invalid = true
      return invalid;
    },

    computedError() {
      let compError = "";

      if(this.get && this.get > this.currentGate.info.max_sum) compError = "Максимальная сумма покупки не должна превышать <br>" + this.currentGate.info.max_sum + " USDR";
      if(this.get && this.get > 0 && this.get < this.currentGate.info.min_sum) compError = "Минимальная сумма покупки не должна быть меньше <br>" + this.currentGate.info.min_sum + " USDR";

      return compError;
    },

    gates() {
      return this.$store.getters.getGates
    },
    pay: {
      get() {
        return this.$store.getters.getPaySumm
      },
      set(val) {
        this.$store.commit("setPaySumm", val)
      }
    },
    get: {
      get() {
        return this.$store.getters.getGetSumm
      },
      set(val) {
        this.$store.commit("setGetSumm", val)
      }
    },
    currentGate: {
      get() {
        return this.$store.getters.getCurrentGate;
      },
      set(val) {
        this.$store.commit('setCurrentGate', val);
      }
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