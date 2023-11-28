const asyncHandler = require("express-async-handler");
const configGooglePaLM = require("../config/GooglePaLMconfig");
const GooglePaLMservice = require("../services/GooglePaLMservice");
const GooglePaLMResponseConfig = require("../utils/GooglepalmResponseConfig");
const TmdbService = require("../services/TMDBservice");

const getMovie = asyncHandler(async (req, res) => {
  const {genres} = req.body;
  const client = configGooglePaLM();
  const result = await GooglePaLMservice(genres, client);
  const movieArrayString = GooglePaLMResponseConfig(result);
  const movieArray = JSON.parse(movieArrayString);
  const movieDetails = await TmdbService(movieArray);
  res.status(200).json(JSON.stringify(movieDetails));
});

module.exports = {getMovie};
