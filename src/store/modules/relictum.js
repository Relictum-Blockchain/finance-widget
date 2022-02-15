import axios from "axios";
import config from "@/config"

export default {
  state: {
    relictum: null,
  },
  actions: {
    checkRelictumAddress(ctx, address) {
      ctx.commit("setLoading", {
        name: "relictum",
        enable: true
      });

      ctx.commit("setError", null);
      axios.get(`${config.request}/api/v1/finance/check-relictum?address=${address}`).then(resp => {
        if(!resp || !resp.data) {
          console.err("err");
          ctx.commit("setError", "Server error");
          return;
        }
        if(!resp.data.success) {
          ctx.commit("setError", "Node is not response, try again later");
          return;
        }
        if(!resp.data.status) {
          ctx.commit("setError", "Wrong address");
          return;
        }
        
        if(ctx.getters.getCurrentGate.name !== 'USDC') {
          ctx.dispatch("sendForm");
        } else {
          ctx.commit("setStep", 'card');
        }
        
      }).catch(err => {
        ctx.commit("setError", "Server error");
        console.error(err)
      }).finally(() => {
        ctx.commit("setLoading", {
          name: "relictum",
          enable: false
        });
      })
    },
  },
  mutations: {
    setRelictum(state, val) {
      state.relictum = val;
    },
  },
  getters: {
    getRelictum(state) {
      return state.relictum;
    },
  }
}