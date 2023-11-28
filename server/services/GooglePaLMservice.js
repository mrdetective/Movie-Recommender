const GooglePaLMservice = async (genres, client) => {
  const result = await client.generateMessage({
    model: "models/chat-bison-001",
    temperature: 0.5,
    candidateCount: 1,
    prompt: {
      context: `Please provide me with an array of movie genres. Based on those genres, generate an array of 10 unique movie names in the form of JSON objects. Each object should have two key-value pairs: "name" for the movie name and "year" for the release year. Ensure that each movie is a mixture of the given genres.`,
      messages: [{content: genres}],
    },
  });
  return result;
};

module.exports = GooglePaLMservice;
