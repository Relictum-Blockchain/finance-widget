<template lang="pug">
  .card-pay
    head-section(title="Заполните данные карты" to="relictum")
    .card-pay__cell(v-for="field in fields"  :class="{[field.cls]: field.cls, 'hidden': field.type == 'hidden'}" )
      //- v-if="computedDistrict(field.name)"
      field(v-model="field.value" :options="field.list" :label="field.label" cls="smart" :type="field.type" :placeholder="field.placeholder" :validate="field.pattern" :mask="field.mask" :error="field.error" @validUpdate="clearField(field)")
    .card-pay__cell(v-if="error")
      .error-field
        span {{ error }}
    .card-pay__cell
      btn(caption="Принять и продолжить" cls="full" :disabled="!validationTest" @click.native="sendCard()")
</template>

<script>
  export default {
    data() {
      return {
        fields: {
          cardnumber: {
            value: null,
            label: "Номер карты",
            type: "text",
            error: false,
            placeholder: "0000 0000 0000 0000",
            pattern: ".{19,19}",
            mask: "#### #### #### ####",
            cls: "city"
          },

          cvv: {
            value: null,
            label: "CVV",
            type: "password",
            error: false,
            placeholder: "***",
            pattern: ".{3,3}",
            mask: "###",
            cls: "postal"
          },

          cardHolder: {
            value: null,
            error: false,
            type: "text",
            label: "ФИО Владельца карты",
            placeholder: "Ivan Ivanovich",
            pattern: ".{3,100}",
            name: "cardHolder",
            cls: "city"
          },

          date: {
            value: null,
            label: "Дата окончания",
            type: "text",
            placeholder: "00/0000",
            error: false,
            pattern: "[0-1][0-9]/20[2-9][0-9]",
            mask: "##/####",
            name: "date",
            cls: "postal"
          },

          addressLine: {
            value: null,
            label: "Адрес",
            type: "text",
            placeholder: "My Home Street h24, ap37",
            error: false,
            pattern: ".{3,200}",
            name: "addressLine"
          },

          city: {
            value: null,
            label: "Город",
            type: "text",
            error: false,
            pattern: ".{3,70}",
            name: "city",
            cls: "city"
          },

          postalCode: {
            value: null,
            label: "Код города",
            type: "number",
            error: false,
            pattern: ".{3,20}",
            name: "postalCode",
            cls: "postal"
          },

          district: {
            value: null,
            label: "Дистрикт (Штат или Область)",
            type: "text",
            error: false,
            pattern: ".{0,70}",
            name: "district"
          },

          countryCode: {
            value: null,
            label: "Страна",
            placeholder: "Выберите страну",
            type: "select",
            pattern: ".{1,10}",
            name: "countryCode",
            list: []
          },
          phone: {
            value: null,
            label: "Телефон",
            type: "text",
            error: false,
            pattern: ".{6,20}",
            name: "phone"
          },
        }
      }
    },
    computed: {
      countryList() {
        return this.$store.getters.getCountries;
      },
      error() {
        return this.$store.getters.getError;
      },
      validationTest() {
        let fs = true;
        for(let field in this.fields) {
          if(!this.fields[field].pattern) return;
          const field_rule = (!new RegExp(this.fields[field].pattern).test(this.fields[field].value) || !this.fields[field].value || this.fields[field].value === "");
          if(field_rule) fs =  false;
        }
        return fs;
      }
    },
    watch: {
      countryList(val) {
        this.fields.countryCode.list = val;
      }
    },
    mounted() {
      this.$store.dispatch("getCities");
      this.$store.dispatch("getCircleKey");
    },
    methods: {
      computedDistrict(field) {
        if(field === 'district' && (!this.fields.countryCode || !this.fields.countryCode.value || (this.fields.countryCode.value.value !== 'CA' && this.fields.countryCode.value.value !== 'US'))) {
          return false;
        }
        return true;
      },
      clearField(field) {
        field.error = false;
      },

      sendCard() {
        this.$store.dispatch("sendCircleForm", this.fields)
      }
    }
  }
</script>