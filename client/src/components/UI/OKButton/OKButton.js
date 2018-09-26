import React from 'react';

const OKButton = (props) => {
  return(
    <button className='btn float-right btn-primary' onClick={props.click} disabled={props.buttonDisabled}>OK</button>
  );
}

export default OKButton;