import axios from "axios";
import config from "@/config"
import router from "@/router"

export default {
  actions: {
    sendForm(ctx) {
      ctx.commit("setLoading", {
        name: "sendingForm",
        enable: true
      });

      const st = ctx.getters.getSelectedStep;
      ctx.commit("setError", null);
      ctx.commit("setStatusData", null);

      let data = {
        api_key: ctx.getters.getKey,
        currency: st === 'buy' ? ctx.getters.getCurrentGate.name : ctx.getters.getCurrentOutGate.name,
        sum: st === 'buy' ? ctx.getters.getGetSumm : ctx.getters.getSellPaySumm,
        email: ctx.getters.getEmail,
        relictum: ctx.getters.getRelictum
      }

      data = Object.assign(data, ctx.getters.getExternalFields);

      axios.post(`${config.request}/api/v1/finance/${st}`, data).then(resp => {
        if(!resp || !resp.data) {
          ctx.commit("setError", "Server Error");
          console.error(resp)
          return;
        }

        if(!resp.data.success) {
          if(resp.data.errors) {
            const fs = Object.values(resp.data.errors);
            ctx.commit("setError", fs[0][0]);
          } else {
            ctx.commit("setError", "Server Error");
          }
          return;
        }
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
          name: "sendingForm",
          enable: false
        });
      })
        
    },
    resetForm(ctx) {
      ctx.commit("setEmail", null);
      ctx.commit("setRelictum", null);
      ctx.commit("setError", null);
      ctx.commit("setStatusData", null);
      ctx.commit("setPaySumm", 0);
      ctx.commit("setGetSumm", 0);
      ctx.commit("setSellPaySumm", 0);
      ctx.commit("setSellGetSumm", 0);
      ctx.commit("setStep", 'buy');
      ctx.dispatch("fetchGates");
    },
  },
}