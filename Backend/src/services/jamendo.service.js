const axios = require("axios");
const { jamendoClientId } = require("../config/env");

const searchJamendoTracks = async (query = "") => {
  const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
    params: {
      client_id: jamendoClientId,
      format: "json",
      limit: 20,
      search: query,
      include: "musicinfo",
      audioformat: "mp32",
    },
  });

  return response.data.results;
};

module.exports = {
  searchJamendoTracks,
};