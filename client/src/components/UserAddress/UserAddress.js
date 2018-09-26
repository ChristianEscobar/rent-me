import React from 'react';
import Autosuggest from 'react-autosuggest';
import NextButton from '../UI/NextButton/NextButton';
import './UserAddress.css';

const UserAddress = (props) => {
  const { address, addressSuggestions } = props;
  
  const inputProps = {
    placeholder: "Enter address",
    value: address,
    onChange: props.onChange
  };

  const cardStyles = {
    transform: props.show ? 'translateX(0)' : 'translateX(-50vh)',
    opacity: props.show ? '1' : '0',
    position: props.show ? 'relative' : 'absolute',
    left: props.show ? '0px' : '-50px'
  }

  return (
    <div className='card mt-4 card-shadow form-container' style={cardStyles}>
      <div className='card-body'>
        <div className='form-row'>
          <div className='form-group col-md-12'>
            <label>Address</label>
            <Autosuggest
              suggestions={addressSuggestions}
              onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={props.onSuggestionsClearRequested}
              getSuggestionValue={props.getSuggestionValue}
              renderSuggestion={props.renderSuggestion}
              inputProps={inputProps}/>
          </div>
        </div>
        <h6 className='card-text mb-2 text-muted'>{props.autoSuggestError}</h6>
        <div className='form-row'>
          <div className='form-group col-md-12'>
            <NextButton clickHandler={props.nextHandler} progress={30} disabled={props.nextButtonDisabled} next='user_rent'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;