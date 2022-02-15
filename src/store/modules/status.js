import axios from "axios";
import config from "@/config"

export default {
  state: {
    statusData: null
  },
  actions: {
    checkStatus(ctx, id) {
      ctx.commit("setLoading", {
        name: "statusChecker",
        enable: true
      });

      ctx.commit("setError", null);
      axios.get(`${config.request}/api/v1/finance/status?id=${id}`).then(resp => {
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
    },
  },
  mutations: {
    setStatusData(state, val) {
      state.statusData = val;
    },
  },
  getters: {
    getStatusData(state) {
      return state.statusData;
    },
  }
}