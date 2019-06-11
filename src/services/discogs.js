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
      return Discogs._parseAlbum(response.data);
    } catch (error) {
      return [];
    }
  }

  static async getAlbumTracklist(id) {
    try {
      const response = await axios.get(`${DISCOGS_URL}/masters/${id}`);
      return Discogs._parseAlbum(response.data);
    } catch (error) {
      return undefined;
    }
  }

  static _parseAlbum(data) {
    return data.results.reduce((albums, row) => {
      if (row.type == "master") {
        albums.push({
          id: row.id,
          cover: row.cover_image,
          title: row.title,
          year: row.year
        });
      }

      return albums;
    }, []);
  }
}
