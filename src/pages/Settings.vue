<template>
  <form>
    <v-card ref="form">
      <v-toolbar card prominent>
        <v-toolbar-title class="body-2 grey--text">Settings</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          label="File Name Pattern"
          v-model="fileNamePattern"
          :error-messages="fileNamePatternErrors"
          :full-width="true"
          @input="$v.fileNamePattern.$touch()"
          @blur="$v.fileNamePattern.$touch()"
        ></v-text-field>

        <v-btn @click="save" :disabled="this.$v.$invalid">Save</v-btn>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="isSaved" :timeout="5000">
      <v-icon color="white">check</v-icon>
      Setttings saved !
      <v-btn color="primary" flat @click="isSaved = false">
        Close
      </v-btn>
    </v-snackbar>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { FILE_NAME_PATTERN } from "../storage";

export default {
  mixins: [validationMixin],

  name: "Settings",
  data() {
    return {
      isSaved: false,
      fileNamePattern: localStorage.getItem(FILE_NAME_PATTERN)
    };
  },
  validations: {
    fileNamePattern: {
      required
    }
  },
  computed: {
    fileNamePatternErrors() {
      const errors = [];

      if (!this.$v.fileNamePattern.required)
        errors.push("Pattern is required.");

      return errors;
    }
  },
  methods: {
    save() {
      localStorage.setItem(FILE_NAME_PATTERN, this.fileNamePattern);
      this.isSaved = true;
    }
  }
};
</script>
