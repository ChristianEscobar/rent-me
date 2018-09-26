import React from 'react';
import OKButton from '../UI/OKButton/OKButton';
import PrevButton from '../UI/PrevButton/PrevButton';
import ExpectedMonthlyRent from '../../components/UI/ExpectedMonthlyRent/ExpectedMonthlyRent';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import './RentValuation.css';

const RentValuation = (props) => {
  
  const cardStyles = {
    transform: props.show ? 'translateX(0)' : 'translateX(-50vh)',
    opacity: props.show ? '1' : '0',
    position: props.show ? 'relative' : 'absolute',
    left: props.show ? '0px' : '-50px'
  }

  let errorMsg = props.errorMsg.substring(7);

  let content = (props.loading) ? <Spinner /> :
    <Aux>
      <h3 className='card-title'>Expected Rent</h3>
      <h6 className='card-subtitle mb-2 text-muted rent-card-subtitle'>{props.address}</h6>
      <h5 style={{textDecoration: 'underline'}}>Rent Valuation Range</h5>
      <h6>{errorMsg.charAt(0).toUpperCase() + props.errorMsg.substring(7).slice(1)}</h6>
      { (errorMsg.length > 0) ? <PrevButton clickHandler={props.nextHandler} progress={-30} disabled={false} next='user_address'/> :
      <Aux>
        <p className='card-text'>Low: ${props.lowRange.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p className='card-text'>High: ${props.highRange.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <ExpectedMonthlyRent expectedRentOnChange={props.expectedRentChange}/>
        <OKButton buttonDisabled={props.okDisabled} click={props.okClick}/> 
      </Aux>}
    </Aux>;

  return (
    <div className='card mt-4 card-shadow form-container' style={cardStyles}>
      <div className='card-body'>
        {content}
      </div>
    </div>
  );
}

export default RentValuation;