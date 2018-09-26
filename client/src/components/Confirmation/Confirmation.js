import React from 'react';
import OKButton from '../UI/OKButton/OKButton';

const Confirmation = (props) => (
  <div className='card' style={{ backgroundColor: '#FF8000' }}>
    <div className='card-body'>
      <h5 className='card-title'>Thank you!</h5>
      <p className='card-text'>{`${props.firstName}, thank you for signing up!   A confirmation email will be sent to you at the following email address: ${props.email}`}</p>
      <OKButton click={props.modalClick} disabled={false} /> 
    </div>
  </div>
);

export default Confirmation;