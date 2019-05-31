import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { Router } from "./router";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  router: Router,
  render: h => h(App)
}).$mount("#app");
