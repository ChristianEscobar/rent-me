# rent-me

## APIs
<p>The application utilizes the following APIs:</p>

* [Google Places API](https://developers.google.com/places/web-service/intro "Google Places API")
* [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm "Zillow API")

## Setup

<p>You will need to obtain your own API Keys store the values in .env files in your local environment. In addition, the .env file should include configuratin for Nodemailer.  See below for the values which are required.</p>

<p>[ROOT_DIRECTORY]/.env.default</p>
<pre>
  <code>
    NODE_ENV=development

    GOOGLE_PLACES_API_KEY=
    ZILLOW_API_KEY=
    EMAIL_HOST=
    EMAIL_PORT=
    EMAIL_USER=
    EMAIL_PASSWORD=
    SENDER_ADDRESS=
  </code>
</pre>

<p>[ROOT_DIRECTORY]/.env</p>
<pre>
  <code>
    NODE_ENV=development

    GOOGLE_PLACES_API_KEY=[YOUR_API_KEY]
    ZILLOW_API_KEY=[YOUR_API_KEY]
    EMAIL_HOST=[YOUR_EMAIL_HOST]
    EMAIL_PORT=[YOUR_EMAIL_PORT]
    EMAIL_USER=[YOUR_EMAIL_USER_ACCOUNT]
    EMAIL_PASSWORD=[YOUR_EMAIL_ACCOUNT_PASSWORD]
    SENDER_ADDRESS=[SENDER_EMAIL]
  </code>
</pre>
