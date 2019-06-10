import { readdirSync } from "fs";
import { sep } from "path";

const FILE_EXTENSIONS = new Set(["flac", "mp3"]);

export class FileSystem {
  static getFolder(path) {
    const folderName = path.split(sep).pop();

    const audioFiles = readdirSync(path).filter(file => {
      const extension = file.split(".").pop();
      return FILE_EXTENSIONS.has(extension);
    });

    return { name: folderName, path: path, files: audioFiles };
  }
}
