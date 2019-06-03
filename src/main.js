import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Vuetify, {
  VApp,
  VBadge,
  VBtn,
  VCard,
  VContent,
  VContainer,
  VDivider,
  VFlex,
  VIcon,
  VLayout,
  VList,
  VListTile,
  VListTileTitle,
  VListTileContent,
  VListTileAction,
  VNavigationDrawer,
  VTextField
} from "vuetify/lib";
import { Router } from "./router";

import "vuetify/src/stylus/app.styl";
import { DISCOGS_KEY, DISCOGS_SECRET, FILE_NAME_PATTERN } from "./storage";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuetify, {
  components: {
    VApp,
    VBadge,
    VBtn,
    VCard,
    VContent,
    VContainer,
    VDivider,
    VFlex,
    VIcon,
    VLayout,
    VList,
    VListTile,
    VListTileTitle,
    VListTileContent,
    VListTileAction,
    VNavigationDrawer,
    VTextField
  }
});

new Vue({
  router: Router,
  render: h => h(App)
}).$mount("#app");

localStorage.setItem(DISCOGS_KEY, "sdzUjQTGFfPrePmXrYcY");
localStorage.setItem(DISCOGS_SECRET, "yUZTmWvDqWjozLldGXrpmBtzuYqLXcrh");
localStorage.setItem(
  FILE_NAME_PATTERN,
  "[track-num]. [artist] feat [featuring] - [title]"
);
