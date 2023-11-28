const GooglePaLMResponseConfig = (result) => {
  const startIndex = result[0].candidates[0].content.indexOf("[");
  const endIndex = result[0].candidates[0].content.lastIndexOf("]") + 1;
  const movieArrayString = result[0].candidates[0].content.slice(
    startIndex,
    endIndex
  );
  return movieArrayString;
};

module.exports = GooglePaLMResponseConfig;
