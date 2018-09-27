// Test plan for My-Rent //

// Test API routes
/*
  // api/autocomplete/:address
  1. Test via Postman using a valid address validate results are returned
  2. Test via Postman using an invalid address validate results are not returned and response contains error message

  // api/rent-zestimate
  1. Test via Postman using a valid address validate results are returned
  2. Test via Postman using an invalid address, validate results are not returned and response contains error message
  3. Validate responses on Zillow.com

  // api/send-email
  1. Test using a valid email address, expected result is a valid email sent
  2. Test using an invalid email address, response should contain error message email should not be sent out.
*/


// Test User Cases
/*
  1. Validate all user input is correct, expected result is an email being sent out to specified email.
  2. Validate user is unable to continue if required data is not provided.
  3. Validate history table is updated after input sequence is completed.
  4. Validate progress bar proceeds as expected.
*/