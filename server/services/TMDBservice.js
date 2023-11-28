const TmdbService = async (movieArray) => {
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
  return movieDetails;
};

module.exports = TmdbService;
