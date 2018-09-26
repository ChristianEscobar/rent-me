/*
if (process.env.NODE_env === "production") {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
*/

module.exports = {
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  zillowApiKey: process.env.ZILLOW_API_KEY,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailSenderAddress: process.env.SENDER_ADDRESS
};