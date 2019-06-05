import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { Router } from "./router";

import { Storage } from "./storage";

Vue.config.productionTip = false;

Storage.initialize();

new Vue({
  router: Router,
  render: h => h(App)
}).$mount("#app");
