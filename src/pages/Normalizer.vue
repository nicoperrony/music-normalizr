<template>
  <v-card ref="form">
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
          <FolderSelector @change="selectFolder($event)"></FolderSelector>
        </v-layout>
        <v-btn
          color="primary"
          @click="next()"
          :disabled="selectedFolder == undefined"
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
        <v-btn color="primary" @click="next()" flat>Continue</v-btn>
        <v-btn @click="previous()" flat>Previous</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3">
        Summary
        <small>Check informations before processing files</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-btn color="primary" @click="normalize()">Process</v-btn>
        <v-btn flat @click="cancel()">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
import FolderSelector from "../components/FolderSelector.vue";

export default {
  name: "Normalizer",
  components: { FolderSelector },
  data() {
    return {
      currentStep: 1,
      selectedFolder: undefined
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
    normalize() {},
    cancel() {
      this.currentStep = 1;
    },
    selectFolder(folder) {
      this.selectedFolder = folder;
    }
  }
};
</script>
