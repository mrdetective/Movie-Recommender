const asyncHandler = require("express-async-handler");
const {DiscussServiceClient} = require("@google-ai/generativelanguage");
const {GoogleAuth} = require("google-auth-library");

const getMovie = asyncHandler(async (req, res) => {
  const {genres} = req.body;
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_PALM_API_KEY),
  });
  const result = await client.generateMessage({
    model: "models/chat-bison-001",
    temperature: 0.5,
    candidateCount: 1,
    prompt: {
      context: `Please provide me with an array of movie genres. Based on those genres, generate an array of 10 unique movie names in the form of JSON objects. Each object should have two key-value pairs: "name" for the movie name and "year" for the release year. Ensure that each movie is a mixture of the given genres.`,
      messages: [{content: genres}],
    },
  });
  const startIndex = result[0].candidates[0].content.indexOf("[");
  const endIndex = result[0].candidates[0].content.lastIndexOf("]") + 1;
  const movieArrayString = result[0].candidates[0].content.slice(
    startIndex,
    endIndex
  );
  const movieArray = JSON.parse(movieArrayString);
  const fetchPromises = movieArray.map((movie) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movie.name
    )}&include_adult=false&language=en-US&primary_release_year=${
      movie.year
    }&page=1`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.GOOGLE_PALM_AUTH_KEY}`,
      },
    };

    return fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return {
          name: json.results[0].original_title,
          overview: json.results[0].overview,
          popularity: json.results[0].popularity,
          banner: `https://image.tmdb.org/t/p/original${json.results[0].poster_path}`,
          release_date: json.results[0].release_date,
          vote_average: json.results[0].vote_average,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const movieDetails = await Promise.all(fetchPromises);
  res.status(200).json(JSON.stringify(movieDetails));
});

module.exports = {getMovie};
