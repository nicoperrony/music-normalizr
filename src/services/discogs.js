import axios from "axios";

const DISCOGS_KEY = "sdzUjQTGFfPrePmXrYcY";
const DISCOGS_SECRET = "yUZTmWvDqWjozLldGXrpmBtzuYqLXcrh";
const DISCOGS_URL = "https://api.discogs.com";

axios.interceptors.request.use(function(config) {
  return {
    ...config,
    params: {
      ...config.params,
      key: DISCOGS_KEY,
      secret: DISCOGS_SECRET,
      page: 1,
      per_page: 5
    }
  };
});

export class Discogs {
  static async searchAlbum(query) {
    try {
      const response = await axios.get(`${DISCOGS_URL}/database/search`, {
        params: {
          q: query,
          type: "master"
        }
      });
      return Discogs._parseAlbums(response.data);
    } catch (error) {
      return [];
    }
  }

  static async getAlbumDetails(id) {
    try {
      const response = await axios.get(`${DISCOGS_URL}/masters/${id}`);

      return {
        id: id,
        cover: response.data.images[0].resource_url,
        artist: response.data.artists[0].name,
        title: response.data.title,
        genres: response.data.genres,
        year: response.data.year,
        tracklist: Discogs._parseTracklist(response.data.tracklist)
      };
    } catch (error) {
      return undefined;
    }
  }

  static _parseAlbums(data) {
    return data.results.reduce((albums, row) => {
      if (row.type == "master") {
        const releaseTitle = row.title.split(" - ");

        albums.push({
          id: row.id,
          cover: row.cover_image,
          artist: releaseTitle[0],
          title: releaseTitle[1],
          genres: row.genre,
          year: row.year
        });
      }

      return albums;
    }, []);
  }

  static _parseTracklist(data) {
    return data.map(track => {
      const extraArtists = Discogs._parseExtraArtist(track.extraartists);

      return { ...track, extraartists: extraArtists };
    });
  }

  static _parseExtraArtist(data) {
    return data.reduce((artists, artist) => {
      if (artist.role === "Featuring") {
        const cloneTagMatched = artist.name.match(/\([0-9]\)/i);
        let clearedName = artist.name;
        if (cloneTagMatched) {
          clearedName = artist.name.replace(cloneTagMatched[0], "").trim();
        }

        artists.push(clearedName);
      }

      return artists;
    }, []);
  }
}
