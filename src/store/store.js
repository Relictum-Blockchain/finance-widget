import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import emailModule from "@/store/modules/email";
import circleModule from "@/store/modules/circle";
import statusModule from "@/store/modules/status";
import relictumModule from "@/store/modules/relictum";
import gatesModule from "@/store/modules/gates";
import appModule from "@/store/modules/app";
import formModule from "@/store/modules/form";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    emailModule,
    circleModule,
    statusModule,
    relictumModule,
    gatesModule,
    appModule,
    formModule
  }
})

export default store;