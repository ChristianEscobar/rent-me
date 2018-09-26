import React from 'react';
import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ProgressBar.css';

const ProgressBar = (props) => {
  let step1Styles = {
    opacity: (props.currentForm === 'user_data' ? '1' : '0')
  }

  let step2Styles = {
    opacity: (props.currentForm === 'user_address' ? '1' : '0')
  }

  let step3Styles = {
    opacity: (props.currentForm === 'user_rent' ? '1' : '0')
  }

  // Determine checkmark display
  let userDataCheckmarkOpacity = 0;
  let userAddressCheckmarkOpacity = 0;
  let userRentCheckmarkOpacity = 0;

  if(props.percentComplete === 100) {
    userDataCheckmarkOpacity = 1;
    userAddressCheckmarkOpacity = 1;
    userRentCheckmarkOpacity = 1;
  } else if(props.currentForm === 'user_data') {
    userDataCheckmarkOpacity = 0;
    userAddressCheckmarkOpacity = 0;
    userRentCheckmarkOpacity = 0;
  } else if(props.currentForm === 'user_address') {
    userDataCheckmarkOpacity = 1;
    userAddressCheckmarkOpacity = 0;
    userRentCheckmarkOpacity = 0;
  } else if(props.currentForm === 'user_rent') {
    userDataCheckmarkOpacity = 1;
    userAddressCheckmarkOpacity = 1;
    userRentCheckmarkOpacity = 0;
  }

  const userDataCheckmarkStyles = {
    opacity: userDataCheckmarkOpacity
  }

  const userAddressCheckmarkStyles = {
    opacity: userAddressCheckmarkOpacity
  }

  const userRentCheckmarkStyles = {
    opacity: userRentCheckmarkOpacity,
  }

  return (
    <div className='card mt-4 border-white card-shadow'>
      <div className='card-body'>
        <div className='progress-container'>
          <h5>{props.percentComplete}% Complete</h5>
          <Line percent={props.percentComplete} strokeWidth='4' strokeLinecap='round' strokeColor={props.progressColor} />

          <ol className='steps-list'>
            <li>
              <div className='node'>
                {userDataCheckmarkOpacity === 1 ? 
                  <div className='checkmark' style={userDataCheckmarkStyles}>
                    <FontAwesomeIcon icon='check-circle'/>
                  </div> :
                  <div className='arrow' style={step1Styles}>
                    <FontAwesomeIcon icon='arrow-circle-right'/>
                  </div>}
              </div>
              <p>Personal Data</p>
            </li>
            <li>
              <div className='divider'></div>
            </li>
            <li>
              <div className='node'>
                {userAddressCheckmarkOpacity === 1 ?
                  <div className='checkmark' style={userAddressCheckmarkStyles}>
                    <FontAwesomeIcon icon='check-circle'/>
                  </div> :
                  <div className='arrow' style={step2Styles}>
                    <FontAwesomeIcon icon='arrow-circle-right'/>
                  </div>}
              </div>
              <p>Address</p>
            </li>
            <li>
              <div className='divider'></div>
            </li>
            <li>
              <div className='node'>
                {userRentCheckmarkOpacity === 1 ?
                  <div className='checkmark' style={userRentCheckmarkStyles}>
                    <FontAwesomeIcon icon='check-circle'/>
                  </div> :
                  <div className='arrow' style={step3Styles}>
                    <FontAwesomeIcon icon='arrow-circle-right'/>
                  </div>}
              </div>
              <p>Expected Rent</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;