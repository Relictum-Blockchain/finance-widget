import Vue from 'vue'
import widget from './widget.vue'
import store from "@/store/store"
import multiselect from "vue-multiselect"
import field from "@/components/includes/field"
import btn from "@/components/includes/btn"
import headSection from "@/components/includes/head-section"
import VueJsonPretty from 'vue-json-pretty'
import router from '@/router'
import "@/styl/main.styl"

Vue.component("field", field);
Vue.component("multiselect", multiselect);
Vue.component("btn", btn);
Vue.component("head-section", headSection);

// Demo to remove
Vue.component("jp", VueJsonPretty);
import 'vue-json-pretty/lib/styles.css'


Vue.config.productionTip = false

Vue.prototype.$domain = "https://relictum.finance";

new Vue({
  store,
  router,
  render: h => h(widget),
}).$mount('#app')
