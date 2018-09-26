# rent-me

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
