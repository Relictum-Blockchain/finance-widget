<template lang="pug">
  .email-section(v-if="currentGate")
    head-section(title="Введите ваш email адрес" :to="selectedStep")
    .email-section__caption Введите вашу информацию
    .email-section__fields
      field(label="Ваш email"  required="required" cls="smart" placeholder="example@gmail.com" v-model="email" type="email")
    .email-section__external(v-for="li in currentGate.info.data.external_fields")
      field(:label="li.title" :required="li.required" :validate="li.pattern" cls="smart" :placeholder="li.placeholder" v-model="fields[li.field_name]" :type="li.type")
    .email-section__info
      b.email-section__info-title Информация о пользователе
      p Мы не продаем и не передаем ваши личные данные третьим лицам без вашего предварительного согласия.
      p Все операции выполняются в соответствии с Политикой конфиденциальности и предусматривают ее соблюдение по всем пунктам.
    transition(name="fade")
      .email-section__error(v-if="error")
        span {{ error }}
    .email-section__button
      btn(caption="Продолжить" :disabled="buttonValidate" @click.native="sendEmail()")
</template>

<script>
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      fields: {
        client_ip: "hidden"
      }
    }
  },
  watch: {
    fields: {
      deep: true,
      handler(val) {
        this.externalFields = val;
      }
    },
    email() {
      this.$store.commit("setError", null)
    }
  },
  mounted() {
    this.fields = Object.assign(this.externalFields, this.fields);
  },
  computed: {
    externalFields: {
      get() {
        return this.$store.getters.getExternalFields;
      },
      set(val) {
        this.$store.commit('setExternalFields', val);
      }
    },
    email: {
      get() {
        return this.$store.getters.getEmail;
      },
      set(value) {
        this.$store.commit('setEmail', value);
      }
    },
    currentGate: {
      get() {
        return this.$store.getters.getSelectedStep == 'buy' ? this.$store.getters.getCurrentGate : this.$store.getters.getCurrentOutGate;
      },
      set(val) {
        this.$store.commit('setCurrentGate', val);
      }
    },
    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(value) {
        this.$store.commit('setError', value);
      }
    },
    buttonValidate() {
      let invalid = false;
      if(!this.email || !emailRegex.test(String(this.email).toLowerCase())) invalid = true

      if(this.currentGate.info.data.external_fields) {
        this.currentGate.info.data.external_fields.forEach(el => {
          if(el.required === "true" && !this.fields[el.field_name]) invalid = true;
          if(el.pattern && !new RegExp(el.pattern).test(this.fields[el.field_name])) invalid = true;
        });
      }
      return invalid;
    },
    selectedStep: {
      get() {
        return this.$store.getters.getSelectedStep;
      },
      set(val) {
        this.$store.commit("setSelectedStep", val);
      }
    },
  },
  methods: {
    sendEmail() {
      this.$store.dispatch("checkEmail", this.email);
    }
  }
}
</script>