import { readdirSync } from "fs";
import { extname, sep } from "path";

const FILE_EXTENSIONS = new Set([".mp3"]);

export class FileSystem {
  static getFolder(path) {
    const folderName = path.split(sep).pop();

    const audioFiles = readdirSync(path).filter(file => {
      return FILE_EXTENSIONS.has(extname(file));
    });

    return { name: folderName, path: path, files: audioFiles };
  }
}
