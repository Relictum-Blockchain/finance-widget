import axios from "axios";
import config from "@/config"
import router from "@/router"
import { readKey, createMessage, encrypt } from "openpgp";


async function encyptData(publicKey, vr) {
  const decodedPublicKey = await readKey({ armoredKey: atob(publicKey) })
  const message = await createMessage({ text: JSON.stringify(vr) })
  const encryptedData = await encrypt({
      message,
      encryptionKeys: decodedPublicKey,
  });
  return encryptedData;
}

export default {
  state: {
    countries: [],
    publicKey: null,
    keyId: null,
    encryptedPayment: null,
    encryptedCard: null,
    cvv: null,
    cardNumber: null,
    circleFormFields: {}
  },
  actions: {
    getCities(ctx) {
      
      ctx.commit("setLoading", {
        name: "getCities",
        enable: true
      });

      axios.get(`${config.request}/assets/js/countries.json`).then((resp) => {
        if(!resp || !resp.data) return;
        ctx.commit("setCountries", resp.data);
      }).catch(err => {
          console.error(err);
          ctx.commit("setError", "Server Error");
      }).finally(() => {
        ctx.commit("setLoading", {
          name: "getCities",
          enable: false
        });
      })
    },
    getCircleKey(ctx) {
      ctx.commit("setLoading", {
        name: "circleKey",
        enable: true
      });
      ctx.commit("setError", null);
      
      return new Promise((res, rej) => {
        
        axios.get(`${config.request}/api/v1/finance/get-key/circle`).then(resp => {
          if(!resp || !resp.data || !resp.data.publicKey) {
              console.error(resp);
              ctx.commit("setError", resp.data);
              rej(resp.data);
              return;
          }
          ctx.commit("setPublicKey", resp.data.publicKey);
          ctx.commit("setKeyId", resp.data.keyId);
          res('ok');
        }).catch(err => {
            console.error(err);
            rej(err);
            ctx.commit("setError", "Server Error");
        }).finally(() => {
          ctx.commit("setLoading", {
            name: "circleKey",
            enable: false
          });
        });
        
      })
      
    
    },
    async generateEncryptedData(ctx) {
      await ctx.dispatch("getCircleKey");
    
      let encryptedPayment = encyptData(ctx.getters.getPublicKey, { cvv: ctx.getters.getCvv });
      let encryptedCard = encyptData(ctx.getters.getPublicKey, {
          number: ctx.getters.getCardNumber.trim().replace(/\D/g, ''),
          cvv: ctx.getters.getCvv
      });

      await Promise.all([encryptedPayment, encryptedCard]).then(([encryptedPayment, encryptedCard]) => {
        ctx.commit("setEncryptedPayment", btoa(encryptedPayment));
        ctx.commit("setEncryptedCard", btoa(encryptedCard));
      });

    },

    async sendCircleForm(ctx, fields) {
      ctx.commit("setLoading", {
        name: "sendCircleForm",
        enable: true
      });

      ctx.commit("setCardNumber", fields.cardnumber.value);
      ctx.commit("setCvv", fields.cvv.value);

      await ctx.dispatch("generateEncryptedData");

      const dataFields = {
        api_key: ctx.getters.getKey,
        email: ctx.getters.getEmail,
        relictum: ctx.getters.getRelictum,
        currency: ctx.getters.getCurrentGate.name,
        sum: ctx.getters.getSelectedStep === 'buy' ? ctx.getters.getPaySumm : ctx.getters.getSellGetSumm,
        expYear: fields.date.value.split("/")[1],
        expMonth: fields.date.value.split("/")[0],
        date: fields.date.value,
        city: fields.city.value,
        cardHolder: fields.cardHolder.value,
        addressLine: fields.addressLine.value,
        postalCode: fields.postalCode.value,
        district: fields.district.value,
        countryCode: fields.countryCode.value.value,
        phone: fields.phone.value,
        encryptedCard: ctx.getters.getEncryptedCard,
        encryptedPayment: ctx.getters.getEncryptedPayment,
        keyId: ctx.getters.getKeyId
      }

      axios.post(`${config.request}/api/v1/finance/buy`, dataFields).then(resp => {

        if(!resp.data.success) {
          if(resp.data.errors) {
            const fs = Object.values(resp.data.errors);
            ctx.commit("setError", fs[0][0]);
          } else {
            ctx.commit("setError", "Server Error");
          }
          return;
        }

        console.log(resp)

        router.push({
          query: {
            statusid: resp.data.transaction.id
          }
        })
        ctx.commit("setStep", 'status');
      }).catch(err => {
        console.error(err);
        ctx.commit("setError", "Server Error");
      }).finally(() => {
        ctx.commit("setLoading", {
          name: "sendCircleForm",
          enable: false
        });
      }); 
    }

  },
  mutations: {
    setCvv(state, cvv) {
      state.cvv = cvv;
    },
    setPublicKey(state, key) {
      state.publicKey = key;
    },
    setEncryptedPayment(state, val) {
      state.encryptedPayment = val;
    },
    setEncryptedCard(state, val) {
      state.encryptedCard = val;
    },
    setKeyId(state, keyId) {
      state.keyId = keyId;
    },
    setCountries(state, val) {
      state.countries = val;
    },
    setCardNumber(state, val) {
      state.cardNumber = val;
    },
    setCircleFormFields(state, val) {
      state.circleFormFields = val;
    }

  },
  getters: {
    getCircleFormFields(state) {
      return state.circleFormFields;
    },
    getCardNumber(state) {
      return state.cardNumber;
    },
    getCvv(state) {
      return state.cvv;
    },
    getEncryptedPayment(state) {
      return state.encryptedPayment;
    },
    getEncryptedCard(state) {
      return state.encryptedCard;
    },
    getPublicKey(state) {
      return state.publicKey;
    },
    getKeyId(state) {
      return state.keyId;
    },
    getCountries(state) {
      return state.countries;
    },
  }
}