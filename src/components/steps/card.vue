<template lang="pug">
  .card-pay
    head-section(title="Заполните данные карты" to="relictum")
    .card-pay__cell(v-for="field in fields" :class="{[field.cls]: field.cls, 'hidden': field.type == 'hidden'}" )
      field(v-model="field.value" :options="field.list" :label="field.label" cls="smart" :type="field.type" :placeholder="field.placeholder" :validate="field.pattern" :mask="field.mask" :error="field.error")
    .card-pay__cell
      btn(caption="Принять и продолжить" cls="full")
</template>

<script>
  export default {
    data() {
      return {
        fields: {
          cardnumber: {
            value: null,
            label: "Card number",
            type: "text",
            error: false,
            placeholder: "0000 0000 0000 0000",
            pattern: ".{19,19}",
            mask: "#### #### #### ####",
            cls: "long"
          },

          cvv: {
            value: null,
            label: "CVV",
            type: "password",
            error: false,
            placeholder: "***",
            pattern: ".{3,3}",
            mask: "###",
            cls: "smart"
          },

          date: {
            value: null,
            label: "Expiry",
            type: "text",
            placeholder: "00/0000",
            error: false,
            pattern: "[0-1][0-9]/20[2-9][0-9]",
            mask: "##/####",
            name: "date"
          },

          cardHolder: {
            value: null,
            error: false,
            type: "text",
            label: "Cardholder name",
            placeholder: "Ivan Ivanovich",
            pattern: ".{3,100}",
            name: "cardHolder"
          },


          addressLine: {
            value: null,
            label: "Address line",
            type: "text",
            placeholder: "My Home Street h24, ap37",
            error: false,
            pattern: ".{3,200}",
            name: "addressLine"
          },

          postalCode: {
            value: null,
            label: "Postalcode",
            type: "number",
            error: false,
            pattern: ".{3,20}",
            name: "postalCode"
          },

          city: {
            value: null,
            label: "City",
            type: "text",
            error: false,
            pattern: ".{3,70}",
            name: "city"
          },

          district: {
            value: null,
            label: "District",
            type: "text",
            error: false,
            pattern: ".{0,70}",
            name: "district"
          },

          countryCode: {
            value: null,
            label: "Country code",
            type: "select",
            error: false,
            name: "countryCode",
            list: []
          },
          phone: {
            value: null,
            label: "Phone",
            type: "text",
            error: false,
            pattern: ".{6,20}",
            name: "phone"
          },

          expYear: {
            value: null,
            type: "hidden",
            name: "expYear"
          },

          expMonth: {
            value: null,
            type: "hidden",
            name: "expMonth"
          },

          encryptedCard: {
            value: null,
            type: "hidden",
            name: "encryptedCard"
          },

          encryptedPayment: {
            value: null,
            type: "hidden",
            name: "encryptedPayment"
          },

          keyId: {
            value: null,
            type: "hidden",
            name: "keyId"
          }
        }
      }
    },
    computed: {
      countryList() {
        return this.$store.getters.getCountries;
      }
    },
    watch: {
      countryList(val) {
        this.fields.countryCode.list = val;
      }
    },
    mounted() {
      this.$store.dispatch("getCities")
    },
    methods: {
      sendFields() {
        // const fields = this.fields;

      }
    }
  }
</script>