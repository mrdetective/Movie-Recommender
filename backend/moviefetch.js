import axios from "axios";
import {config} from "dotenv";
config();
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8484;

app.use(cors());

async function getMovieDetails(title) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${
        process.env.OMDB_KEY
      }`
    );
    if (response.status === 200 && response.data && response.data.Poster) {
      const {Poster, Plot, Year} = response.data;

      // Fetch IMDb rating separately
      const imdbResponse = await axios.get(
        `http://www.omdbapi.com/?i=${response.data.imdbID}&apikey=${process.env.OMDB_KEY}`
      );
      const imdbRating = imdbResponse.data?.imdbRating || "N/A";

      // Fetch Metacritic score separately
      const metacriticResponse = await axios.get(
        `http://www.omdbapi.com/?i=${response.data.imdbID}&apikey=${process.env.OMDB_KEY}&tomatoes=true`
      );
      const metacriticScore = metacriticResponse.data?.tomatoMeter || "N/A";

      return {
        title,
        banner: Poster,
        summary: Plot,
        year: Year,
        imdbRating,
        metacriticScore,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving movie data:", error.message);
    return null;
  }
}

app.get("/", async (req, res) => {
  const movieNames = req.query.moviename;
  const movies = Array.isArray(movieNames) ? movieNames : [movieNames];
  const movieDetails = await Promise.all(
    movies.map(async (title) => {
      const details = await getMovieDetails(title);
      return details;
    })
  );
  res.json(movieDetails);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
