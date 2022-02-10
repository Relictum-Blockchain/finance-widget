import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router"

Vue.use(Vuex);

// https://dev.relictum.finance

const datas = {
  domain: "/ajax"
}

const store = new Vuex.Store({
  state: {
    loading: [],
    step: "buy",
    selectedStep: 'buy',
    gates: null,
    outGates: null,
    currentGate: null,
    currentOutGate: null,
    paySumm: null,
    getSumm: null,
    sellPaySumm: null,
    sellGetSumm: null,
    currentError: null,
    relictum: null,
    email: null,
    externalFields: {},
    statusData: null,
  },
  actions: {
    fetchGates(ctx) {
      ctx.commit("setLoading", {
        name: "gates",
        enable: true
      });

      axios.get(`${datas.domain}/api/v1/finance/gates`).then(resp => {
        if(!resp || !resp.data) {
          console.err("err")
          return;
        }

        const normalizedData = resp.data;

        for(let v in normalizedData) {
          const rs = [];
          for(let c in normalizedData[v]) {
            rs.push({
              name: c,
              info: normalizedData[v][c][0]
            })
          }
          normalizedData[v] = rs;
        }

        ctx.commit("setGates", normalizedData);
        if(normalizedData && normalizedData.gates) ctx.commit("setCurrentGate", normalizedData.gates[0])
        if(normalizedData && normalizedData.gates_out) ctx.commit("setCurrentOutGate", normalizedData.gates_out[0])
        
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        ctx.commit("setLoading", {
          name: "gates",
          enable: false
        });
      })
    },
    checkRelictumAddress(ctx, address) {

      ctx.commit("setLoading", {
        name: "relictum",
        enable: true
      });

      ctx.commit("setError", null);

      axios.get(`${datas.domain}/api/v1/finance/check-relictum?address=${address}`).then(resp => {

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

        if(resp.data.status && resp.data.success) ctx.dispatch("sendForm");

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
    checkEmail(ctx, email) {
      ctx.commit("setLoading", {
        name: "emailChecker",
        enable: true
      });
      ctx.commit("setRelictum", null);
      ctx.commit("setError", null);
      axios.get(`${datas.domain}/api/v1/user/get-relictum?email=${email}`).then(resp => {

        if(!resp || !resp.data) {
          console.error(resp)
          ctx.commit("setError", "Server Error");
          return;
        }

        if(!resp.data.success) {
          ctx.commit("setError", "Wrong email");
          return;
        }

        if(resp.data.relictum) ctx.commit("setRelictum", resp.data.relictum);
        if(resp.data.success) ctx.commit("setStep", 'relictum');

      }).catch(err => {
        console.error(err)
        ctx.commit("setError", "Server Error");
      }).finally(() => {
        ctx.commit("setLoading", {
          name: "emailChecker",
          enable: false
        });
      })
    },
    sendForm(ctx) {
      ctx.commit("setLoading", {
        name: "sendingForm",
        enable: true
      });

      const st = ctx.getters.getSelectedStep;
      ctx.commit("setError", null);
      ctx.commit("setStatusData", null);

      let data = {
        api_key: "RELICTUM_FINANCE",
        currency: st === 'buy' ? ctx.getters.getCurrentGate.name : ctx.getters.getCurrentOutGate.name,
        sum: st === 'buy' ? ctx.getters.getGetSumm : ctx.getters.getSellPaySumm,
        email: ctx.getters.getEmail,
        relictum: ctx.getters.getRelictum
      }

      data = Object.assign(data, ctx.getters.getExternalFields);

      axios.post(`${datas.domain}/api/v1/finance/${st}`, data).then(resp => {
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
    checkStatus(ctx, id) {

      ctx.commit("setLoading", {
        name: "statusChecker",
        enable: true
      });

      ctx.commit("setError", null);

      axios.get(`${datas.domain}/api/v1/finance/status?id=${id}`).then(resp => {

        if(!resp || !resp.data) {
          console.error(resp)
          ctx.commit("setError", "Server Error");
          return;
        }

        if(!resp.data.success) {
          ctx.commit("setError", "Server Error");
          return;
        }

        ctx.commit("setStatusData", resp.data);
      }).catch(err => {
        console.error(err)
        ctx.commit("setError", "Server Error");
      }).finally(() => {
        ctx.commit("setLoading", {
          name: "statusChecker",
          enable: false
        });
      });
    }
  },
  mutations: {
    setSellPaySumm(state, val) {
      state.sellPaySumm = val;
    },
    setStatusData(state, val) {
      state.statusData = val;
    },
    setSellGetSumm(state, val) {
      state.sellGetSumm = val;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setExternalFields(state, val) {
      state.externalFields = val;
    },
    setLoading(state, { name, enable }) {
      if (enable) {
        state.loading.push(name);
      } else {
        state.loading = state.loading.filter((el) => el !== name);
      }
    },
    setGates(state, val) {
      if(val && val.gates) state.gates = val.gates;
      if(val && val.gates_out) state.outGates = val.gates_out;
    },
    setCurrentGate(state, val) {
      state.currentGate = val;
    },
    setCurrentOutGate(state, val) {
      state.currentOutGate = val;
    },
    setStep(state, val) {
      state.step = val;
    },
    setPaySumm(state, val) {
      state.paySumm = val;
    },
    setGetSumm(state, val) {
      state.getSumm = val;
    },
    setSelectedStep(state, val) {
      state.selectedStep = val;
    },
    setRelictum(state, val) {
      state.relictum = val;
    },
    setError(state, val) {
      state.currentError = val;
    }
  },
  getters: {
    getStatusData(state) {
      return state.statusData;
    },
    getSellPaySumm(state) {
      return state.sellPaySumm;
    },
    getSellGetSumm(state) {
      return state.sellGetSumm;
    },
    getError(state) {
      return state.currentError;
    },
    getExternalFields(state) {
      return state.externalFields;
    },
    getEmail(state) {
      return state.email;
    },
    getRelictum(state) {
      return state.relictum;
    },
    getSelectedStep(state) {
      return state.selectedStep;
    },
    getPaySumm(state) {
      return state.paySumm;
    },
    getGetSumm(state) {
      return state.getSumm;
    },
    getLoading(state) {
      return state.loading.length > 0;
    },
    getGates(state) {
      return state.gates;
    },
    getOutGates(state) {
      return state.outGates;
    },
    getCurrentGate(state) {
      return state.currentGate
    },
    getStep(state) {
      return state.step
    },
    getCurrentOutGate(state) {
      return state.currentOutGate
    }
  }
})

export default store;