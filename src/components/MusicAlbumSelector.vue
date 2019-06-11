<template>
  <v-layout column>
    <v-autocomplete
      v-model="album"
      :items="albums"
      :search-input.sync="search"
      :loading="isLoading"
      :return-object="true"
      color="primary lighten-2"
      label="Album"
      item-text="title"
      prepend-icon="search"
      @input="selectAlbum"
    >
      <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-title>
            No album found
          </v-list-tile-title>
        </v-list-tile>
      </template>

      <template v-slot:item="data">
        <v-list-tile-avatar tile>
          <img :src="data.item.cover" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ data.item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ data.item.year }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
    </v-autocomplete>

    <v-card>
      <v-list v-if="selectedAlbum" two-line>
        <v-list-tile avatar>
          <v-list-tile-avatar tile>
            <img :src="selectedAlbum.cover" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ selectedAlbum.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{
              selectedAlbum.year
            }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn @click="unselectAlbum()" icon ripple>
              <v-icon color="grey lighten-1">cancel</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
import { Discogs } from "../services/discogs";
import _ from "lodash";

export default {
  name: "MusicAlbumSelector",
  props: {
    selectedAlbum: undefined
  },
  data() {
    return {
      search: "",
      album: undefined,
      isLoading: false,
      albums: []
    };
  },
  methods: {
    selectAlbum() {
      this.$emit("update:selectedAlbum", this.album);
    },
    unselectAlbum() {
      this.$emit("update:selectedAlbum", undefined);
    }
  },
  watch: {
    selectedAlbum(newVal) {
      if (newVal === undefined) {
        this.album = undefined;
        this.albums = [];
      }
    },
    search: _.debounce(function() {
      if (this.search && this.selectedAlbum == undefined) {
        this.isLoading = true;
        Discogs.searchAlbum(this.search).then(
          function(res) {
            this.albums = res;
            this.isLoading = false;
          }.bind(this)
        );
      }
    }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.v-autocomplete {
  width: 450px;
}
</style>
