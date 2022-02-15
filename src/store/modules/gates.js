import axios from "axios";
import config from "@/config"

export default {
  state: {
    gates: null,
    outGates: null,
    currentGate: null,
    currentOutGate: null,
    paySumm: null,
    externalFields: {},
    getSumm: null,
    sellPaySumm: null,
    sellGetSumm: null,
  },
  actions: {
    fetchGates(ctx) {
      ctx.commit("setLoading", {
        name: "gates",
        enable: true
      });

      axios.get(`${config.request}/api/v1/finance/gates`).then(resp => {
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
  },
  mutations: {
    setSellPaySumm(state, val) {
      state.sellPaySumm = val;
    },
    setSellGetSumm(state, val) {
      state.sellGetSumm = val;
    },
    setExternalFields(state, val) {
      state.externalFields = val;
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
    setPaySumm(state, val) {
      state.paySumm = val;
    },
    setGetSumm(state, val) {
      state.getSumm = val;
    },
  },
  getters: {
    getSellPaySumm(state) {
      return state.sellPaySumm;
    },
    getSellGetSumm(state) {
      return state.sellGetSumm;
    },
    getExternalFields(state) {
      return state.externalFields;
    },
    getPaySumm(state) {
      return state.paySumm;
    },
    getGetSumm(state) {
      return state.getSumm;
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
    getCurrentOutGate(state) {
      return state.currentOutGate
    }
  }
}