import NodeID3 from "node-id3";
import { sep } from "path";

export class Normalizr {
  static checkConsistency(folder, album) {
    return folder.files.length === album.tracklist.length;
  }

  static process(folder, album) {
    return new Promise((resolve, reject) => {
      try {
        for (let [i, fileName] of folder.files.entries()) {
          const filePath = folder.path + sep + fileName;
          const track = album.tracklist[i];
          const position = i + 1;

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
            trackNumber: position,
            year: album.year
          };

          NodeID3.write(tags, filePath);
        }

        resolve(true);
      } catch {
        reject(false);
      }
    });
  }
}
