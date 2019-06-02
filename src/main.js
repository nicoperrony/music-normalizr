import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Vuetify, {
  VApp,
  VContent,
  VContainer,
  VDivider,
  VNavigationDrawer,
  VIcon,
  VLayout,
  VList,
  VListTile,
  VListTileTitle,
  VListTileContent,
  VListTileAction
} from "vuetify/lib";
import { Router } from "./router";

import "vuetify/src/stylus/app.styl";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuetify, {
  components: {
    VApp,
    VContent,
    VContainer,
    VDivider,
    VNavigationDrawer,
    VIcon,
    VLayout,
    VList,
    VListTile,
    VListTileTitle,
    VListTileContent,
    VListTileAction
  }
});

new Vue({
  router: Router,
  render: h => h(App)
}).$mount("#app");
