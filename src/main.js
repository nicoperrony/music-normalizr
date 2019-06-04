import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { Router } from "./router";

import { DISCOGS_KEY, DISCOGS_SECRET, FILE_NAME_PATTERN } from "./storage";

Vue.config.productionTip = false;

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
