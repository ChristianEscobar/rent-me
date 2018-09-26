import React from 'react';

const NextButton = (props) => {
  return(
    <button className='btn float-right btn-primary' onClick={(e) => props.clickHandler(e, props.next, props.progress)} disabled={props.disabled}>Next</button>
  )
}

export default NextButton;