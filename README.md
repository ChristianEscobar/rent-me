# rent-me

## APIs
<p>The application utilizes the following APIs:</p>

* [Google Places API](https://developers.google.com/places/web-service/intro "Google Places API")
* [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm "Zillow API")

## Setup

<p>You will need to obtain your own API Keys and setup the files specified below.  Take note of the dev.js file where the API keys should be stored.  In addition, the dev.js file is where you will specify your email configuration details for Nodemailer</p>

<p>[ROOT_DIRECTORY]/config/keys.js</p>
<pre>
  <code>
    if (process.env.NODE_env === "production") {
      module.exports = require('./prod');
    } else {
      module.exports = require('./dev');
    }
  </code>
</pre>

<p>[ROOT_DIRECTORY]/config/dev.js</p>
<pre>
  <code>
    module.exports = {
      googlePlacesApiKey: '[YOUR_PLACES_API_KEY]',
      zillowApiKey: '[YOUR_ZILLOW_API_KEY]',
      emailHost: 'smtp.gmail.com', // Update to your specific host
      emailPort: 587, // Update to your specific port
      emailUser: '[YOUR_EMAIL_USER_ACCOUNT]]',
      emailPassword: '[YOUR_EMAIL_ACCOUNT_PASSWORD]',
      emailSenderAddress: '[SENDER_EMAIL_ADDRESS]'
    };
  </code
</pre>
