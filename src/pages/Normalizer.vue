<template>
  <v-card ref="form">
    <div v-if="isProcessing" class="overlay text-center">
      <v-progress-circular
        indeterminate
        :size="70"
        color="primary"
        class="spinner"
      ></v-progress-circular>
    </div>
    <v-toolbar card prominent>
      <v-toolbar-title class="body-2 grey--text">Processing</v-toolbar-title>
    </v-toolbar>

    <v-stepper v-model="currentStep" vertical>
      <v-stepper-step :complete="isComplete(1)" step="1">
        Select a folder
        <small>Choose a folder to analyzed and processed</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-layout column align-center justify-center>
          <FolderSelector v-bind:selectedFolder.sync="folder"></FolderSelector>
        </v-layout>
        <v-btn
          color="primary"
          @click="next()"
          :disabled="folder == undefined"
          flat
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="isComplete(2)" step="2">
        Select a music album
        <small>Find a music album corresponding to your files</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-layout column align-center justify-center>
          <MusicAlbumSelector
            v-bind:selectedAlbum.sync="album"
          ></MusicAlbumSelector>
        </v-layout>
        <v-btn
          color="primary"
          @click="next()"
          :disabled="album == undefined"
          flat
          >Continue</v-btn
        >
        <v-btn @click="previous()" flat>Previous</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3">
        Summary
        <small>Check informations before processing files</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-btn color="primary" @click="normalize()">Process</v-btn>
        <v-btn flat @click="reset()">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 10;
}

.spinner {
  position: absolute; /*it can be fixed too*/
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>

<script>
import FolderSelector from "../components/FolderSelector.vue";
import MusicAlbumSelector from "../components/MusicAlbumSelector.vue";
import { Normalizr } from "../services/normalizr";

export default {
  name: "Normalizer",
  components: { FolderSelector, MusicAlbumSelector },
  data() {
    return {
      currentStep: 1,
      isProcessing: false,
      folder: undefined,
      album: undefined
    };
  },
  methods: {
    isComplete(step) {
      this.currentStep > step;
    },
    previous() {
      this.currentStep--;
    },
    next() {
      this.currentStep++;
    },
    async normalize() {
      this.isProcessing = true;
      await Normalizr.process(this.folder, this.album)
        .then(() => {
          this.reset();
        })
        .catch(() => {
          this.reset();
        })
        .finally(() => {
          this.isProcessing = false;
        });
    },
    reset() {
      this.currentStep = 1;
      this.folder = undefined;
      this.album = undefined;
    }
  }
};
</script>
