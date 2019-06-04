import Vue from "vue";
import VueRouter from "vue-router";

import Normalizer from "./pages/Normalizer.vue";
import Settings from "./pages/Settings.vue";

const routes = [
  { path: "/", component: Normalizer },
  { path: "/settings", component: Settings }
];

Vue.use(VueRouter);

export const Router = new VueRouter({
  routes
});
