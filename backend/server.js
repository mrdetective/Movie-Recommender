import {config} from "dotenv";
config();

import {Configuration, OpenAIApi} from "openai";
import express, {json} from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8383;
app.use(cors());

function findmovies(response) {
  const movie = JSON.parse(response);
  var movienames = [];
  for (let i = 0; i < movie.length; i++) {
    movienames[i] = movie[i].moviename;
  }
  var mnames = JSON.stringify(movienames);
  return mnames;
}

app.get("/", (req, resp) => {
  const selected_genre = req.query;
  var genre_names = "";
  var c = 0;
  for (var key in selected_genre) {
    if (c != Object.keys(selected_genre).length - 1) genre_names += key + "+";
    else genre_names += key;
    c++;
  }
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.API_KEY,
    })
  );
  openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Give me 10 latest movie names based on these genres combined i.e each movie should be a combination of these genres : ${genre_names} in the following format:
          [{
            "moviename": "Name of the movie"
            "dateofrelease": "Release Year"
          }
          { 
            "moviename": "Name of the movie"
            "dateofrelease": "Release Date"
          }]
          Provide your answer in JSON form. Reply with only the answer in JSON form and include no other commentary`,
        },
      ],
    })
    .then((res) => {
      var res_string = res.data.choices[0].message.content;
      const movies = findmovies(res_string);
      resp.send(movies);
    })
    .catch((error) => {
      var res_string = res.data.choices[0].message.content;
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Convert the given string : ${res_string} into a JSON format and don't add any extra commentary and if the string is already in a json format then give me the string itself`,
            },
          ],
        })
        .then((res1) => {
          let final_string = res1.data.choices[0].message.content;
          const movies = findmovies(final_string);
          localStorage.setItem("movies", JSON.stringify(movies));
          resp.send(movies);
        })
        .catch((error) => {
          console.log(error);
        });
      // consolelog(final_string);
    });
});
app.listen(port, () => {
  `Server has started on port: ${port}`;
});
