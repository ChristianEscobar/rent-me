import React from 'react';

const PrevButton = (props) => {
  return(
    <button className='btn float-left btn-primary' onClick={(e) => props.clickHandler(e, props.next, props.progress)} disabled={props.disabled}>Prev</button>
  )
}

export default PrevButton;