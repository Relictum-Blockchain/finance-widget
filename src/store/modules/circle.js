import axios from "axios";
import config from "@/config"
import { readKey, createMessage, encrypt, atob, btoa } from "openpgp";


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
    cvv: null
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

      Promise.all([encryptedPayment, encryptedCard]).then(([encryptedPayment, encryptedCard]) => {
        ctx.commit("setEncryptedPayment", btoa(encryptedPayment));
        ctx.commit("setEncryptedCard", btoa(encryptedCard));
      });

    },

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
    }
  },
  getters: {
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