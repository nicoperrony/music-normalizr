<template>
  <v-card>
    <v-list v-if="selectedFolder" two-line>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon class="accent white--text">folder</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ selectedFolder.name }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedFolder.files.length }} audio file(s)
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn @click="unselectFolder()" icon ripple>
            <v-icon color="grey lighten-1">cancel</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-list v-else two-line>
      <v-list-tile @click="selectFolder()" avatar ripple>
        <v-list-tile-avatar>
          <v-icon x-large>add_circle_outline</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>No folder selected</v-list-tile-title>
          <v-list-tile-sub-title>
            Click here to select a folder
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { remote } from "electron";
import { FileSystem } from "../services/file-system";

export default {
  name: "FolderSelector",
  props: {
    selectedFolder: undefined
  },
  methods: {
    selectFolder() {
      remote.dialog.showOpenDialog(
        {
          properties: ["openDirectory"]
        },
        folder => {
          if (folder) {
            // this.selectedFolder = FileSystem.getFolder(folder[0]);
            this.$emit(
              "update:selectedFolder",
              FileSystem.getFolder(folder[0])
            );
          }
        }
      );
    },
    unselectFolder() {
      // this.selectedFolder = undefined;
      this.$emit("update:selectedFolder", undefined);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  width: 450px;
}

.v-list {
  padding: 0;
}
</style>
