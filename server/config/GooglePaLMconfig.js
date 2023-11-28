const {DiscussServiceClient} = require("@google-ai/generativelanguage");
const {GoogleAuth} = require("google-auth-library");

const configGooglePaLM = () => {
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_PALM_API_KEY),
  });
  return client;
};

module.exports = configGooglePaLM;
