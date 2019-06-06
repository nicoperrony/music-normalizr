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
        <v-btn color="primary" @click="next()" flat>Continue</v-btn>
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
export default {
  name: "Normalizer",
  data() {
    return {
      currentStep: 1
    };
  },
  methods: {
    isComplete: function(step) {
      this.currentStep > step;
    },
    previous: function() {
      this.currentStep--;
    },
    next: function() {
      this.currentStep++;
    },
    normalize: function() {},
    cancel: function() {
      this.currentStep = 1;
    }
  }
};
</script>
