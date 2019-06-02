<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        value="true"
        dark
        app
        mini-variant
        hide-overlay
        stateless
      >
        <v-list class="pt-0" dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>menu</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider light></v-divider>

          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>library_music</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile to="/settings">
            <v-list-tile-action>
              <v-badge v-if="!hasSettings()" color="red">
                <template v-slot:badge>
                  <span>!</span>
                </template>
                <v-icon>settings</v-icon>
              </v-badge>
              <v-icon v-else>settings</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <v-layout fill-height justify-center align-center>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-layout>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { DISCOGS_KEY, DISCOGS_SECRET } from "./storage";

export default {
  name: "app",
  components: {},
  data: () => ({
    hasSettings: () =>
      localStorage.getItem(DISCOGS_KEY) && localStorage.getItem(DISCOGS_SECRET)
  })
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
