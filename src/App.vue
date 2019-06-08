<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="hasDrawer" app disable-resize-watcher>
        <v-list class="pa-1">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Music Normalizr</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list dense>
          <v-divider></v-divider>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>library_music</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Processing</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile to="/settings">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-card flat>
        <v-toolbar color="primary" dark extended flat>
          <v-toolbar-side-icon
            @click="hasDrawer = !hasDrawer"
          ></v-toolbar-side-icon>
        </v-toolbar>

        <v-layout row pb-2>
          <v-flex xs10 offset-xs1>
            <transition name="fade" mode="out-in">
              <router-view class="content"></router-view>
            </transition>
          </v-flex>
        </v-layout>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      hasDrawer: false
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: -64px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
