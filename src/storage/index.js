const FILE_NAME_PATTERN = "FILE_NAME_PATTERN";

export { FILE_NAME_PATTERN };

export class Storage {
  static initialize() {
    if (!localStorage.getItem(FILE_NAME_PATTERN)) {
      localStorage.setItem(
        FILE_NAME_PATTERN,
        "[track-num]. [artist] feat [featuring] - [title]"
      );
    }
  }
}
