import React from 'react';

const ExpectedMonthlyRent = (props) => {
  return(
    <div>
      <span>Expected Monthly Rent $</span><input type='number' min='50' max='999999' step='5' placeholder='500' onChange={props.expectedRentOnChange}></input>
    </div>
  );
}

export default ExpectedMonthlyRent;