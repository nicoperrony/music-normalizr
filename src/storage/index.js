const DISCOGS_KEY = "DISCOGS_KEY";
const DISCOGS_SECRET = "DISCOGS_SECRET";
const FILE_NAME_PATTERN = "FILE_NAME_PATTERN";

export { DISCOGS_KEY, DISCOGS_SECRET, FILE_NAME_PATTERN };

export class Storage {
  static initialize() {
    localStorage.setItem(DISCOGS_KEY, "sdzUjQTGFfPrePmXrYcY");
    localStorage.setItem(DISCOGS_SECRET, "yUZTmWvDqWjozLldGXrpmBtzuYqLXcrh");

    if (!localStorage.getItem(FILE_NAME_PATTERN)) {
      localStorage.setItem(
        FILE_NAME_PATTERN,
        "[track-num]. [artist] feat [featuring] - [title]"
      );
    }
  }
}
