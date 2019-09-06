import NodeID3 from "node-id3";
import fs from "fs";
import path from "path";
import { FILE_NAME_PATTERN } from "../storage";

export class Normalizr {
  static checkConsistency(folder, album) {
    return folder.files.length === album.tracklist.length;
  }

  static process(folder, album) {
    return new Promise((resolve, reject) => {
      try {
        for (let [i, fileName] of folder.files.entries()) {
          const filePath = path.join(folder.path, fileName);
          const track = album.tracklist[i];

          let allArtists = album.artist;
          if (track.extraartists.length > 0) {
            allArtists = album.artist + "/" + track.extraartists.join("/");
          }

          const tags = {
            album: album.title,
            title: track.title,
            originalArtist: album.artist,
            artist: allArtists,
            performerInfo: album.artist,
            trackNumber: track.position,
            year: album.year,
            genre: album.genres[0]
          };

          NodeID3.write(tags, filePath);

          console.log(track);

          Normalizr._renameAudioFile(filePath, album, track);
        }

        resolve(true);
      } catch {
        reject(false);
      }
    });
  }

  static _renameAudioFile(filePath, album, track) {
    const pattern = localStorage.getItem(FILE_NAME_PATTERN);
    const extension = path.extname(filePath);
    let featuring = "";
    if (track.extraartists.length > 0) {
      featuring = "feat " + track.extraartists.join(", ");
    }

    const newFileName =
      pattern
        .replace("[position]", track.position)
        .replace("[artist]", album.artist)
        .replace("[featuring]", featuring)
        .replace("[title]", track.title)
        .replace(/ +(?= )/g, "") + extension;

    const newFilePath = path.join(path.dirname(filePath), newFileName);
    console.log(filePath);
    console.log(newFileName);
    console.log(newFilePath);

    fs.renameSync(filePath, newFilePath);
  }
}
