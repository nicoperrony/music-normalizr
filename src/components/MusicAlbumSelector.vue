<template>
  <v-layout column>
    <v-autocomplete
      v-model="selectedAlbumId"
      :items="albums"
      color="primary lighten-2"
      label="Music Album"
      item-text="title"
      item-value="id"
      @input="selectAlbum"
    >
      <template v-slot:item="data">
        <template>
          <v-list-tile-avatar>
            <img :src="data.item.cover" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ data.item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{
              data.item.artist
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>

    <v-card>
      <v-list v-if="selectedAlbum" two-line>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="selectedAlbum.cover" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ selectedAlbum.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{
              selectedAlbum.artist
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
export default {
  name: "MusicAlbumSelector",
  props: {
    selectedAlbum: undefined
  },
  data() {
    return {
      selectedAlbumId: undefined,
      albums: [
        {
          id: 1,
          title: "Pili Pili sur un croissant au beurre",
          artist: "Gaël Faye",
          cover:
            "https://www.laboutiqueafricavivre.com/881-thickbox/gael-faye-pili-pili-sur-un-croissant-au-beurre.jpg"
        },
        {
          id: 3,
          title: "Rythmes et botanique",
          artist: "Gaël Faye",
          cover:
            "https://www.thebackpackerz.com/wp-content/uploads/2017/04/810ZWRuWy9L._SL1181_.jpg"
        },
        {
          id: 2,
          title: "Des fleurs",
          artist: "Gaël Faye",
          cover:
            "https://images.genius.com/186ec1400a212566fb3406042525e5e4.399x399x1.jpg"
        }
      ]
    };
  },
  methods: {
    selectAlbum(id) {
      const album = this.albums.find(album => album.id == id);
      this.$emit("update:selectedAlbum", album);
    },
    unselectAlbum() {
      this.$emit("update:selectedAlbum", undefined);
    }
  },
  watch: {
    selectedAlbum(newVal) {
      if (newVal === undefined) {
        this.selectedAlbumId = undefined;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-autocomplete {
  width: 450px;
}
</style>
