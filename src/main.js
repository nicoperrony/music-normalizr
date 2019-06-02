import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Vuetify, {
  VApp,
  VBadge,
  VContent,
  VContainer,
  VDivider,
  VIcon,
  VLayout,
  VList,
  VListTile,
  VListTileTitle,
  VListTileContent,
  VListTileAction,
  VNavigationDrawer
} from "vuetify/lib";
import { Router } from "./router";

import "vuetify/src/stylus/app.styl";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuetify, {
  components: {
    VApp,
    VBadge,
    VContent,
    VContainer,
    VDivider,
    VIcon,
    VLayout,
    VList,
    VListTile,
    VListTileTitle,
    VListTileContent,
    VListTileAction,
    VNavigationDrawer
  }
});

new Vue({
  router: Router,
  render: h => h(App)
}).$mount("#app");
