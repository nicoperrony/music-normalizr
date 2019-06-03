<template>
  <form>
    <h2>Settings</h2>

    <v-text-field
      v-model="fileNamePattern"
      :error-messages="fileNamePatternErrors"
      label="File Name Pattern"
      :full-width="true"
      required
      @input="$v.fileNamePattern.$touch()"
      @blur="$v.fileNamePattern.$touch()"
    ></v-text-field>

    <v-btn @click="save" :disabled="this.$v.$invalid">Save</v-btn>
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
    }
  }
};
</script>
