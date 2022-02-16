import Vue from 'vue'
import widget from './widget.vue'
import store from "@/store/store"
import multiselect from "vue-multiselect"
import field from "@/components/includes/field"
import btn from "@/components/includes/btn"
import headSection from "@/components/includes/head-section"
import router from '@/router'
import vueCustomElement from 'vue-custom-element'
import config from "@/config"
import i18n from '@/i18n'
import VueMask from 'v-mask'

import componentStyles from '!!raw-loader!stylus-loader!@/styl/main.styl';

Vue.component("field", field);
Vue.component("multiselect", multiselect);
Vue.component("btn", btn);
Vue.component("head-section", headSection);

Vue.config.productionTip = false

Vue.prototype.$domain = config.domain;

Vue.use(vueCustomElement)
Vue.use(VueMask)

widget.store = store
widget.router = router
widget.i18n = i18n

Vue.customElement('finance-widget', widget, {
  shadow: true,
  shadowCss: componentStyles
})