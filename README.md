# rent-me

## Setup
<p>The application utilizes the following APIs:</p>
<ul>
  <li>[Google Places API](https://developers.google.com/places/web-service/intro)</li>
  <li>[Zillow API](https://www.zillow.com/howto/api/APIOverview.htm)</li>
</ul>
<p>As well as the following Node modules:</p>
<ul>
  <li>[Nodemailer](https://nodemailer.com/about/)
</ul>

<p>You will need to obtain your own API Keys and setup the files specified below.  Take note of the dev.js file where the API keys should be stored.  In addition, this is where you will specify your email configuration details.</p>

<p>/config/keys.js</p>
<pre>
  <code>
    if (process.env.NODE_env === "production") {
      module.exports = require('./prod');
    } else {
      module.exports = require('./dev');
    }
  </code>
</pre>

<p>/config/dev.js</p>
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
