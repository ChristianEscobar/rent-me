import React from 'react';
import './Instructions.css';

const Instructions = (props) => {
  return (
    <div className='card mt-4 card-shadow'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card step-card'>
              <div className="card-body">
                <h5 className="card-title">1</h5>
                <h6 className="card-subtitle mb-2 text-muted">Personal Data</h6>
                <p className="card-text">Tell us who you are!  Start out by providing some basic details to help us identify you.</p>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card step-card'>
              <div className="card-body">
                  <h5 className="card-title">2</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Address</h6>
                  <p className="card-text">Show me the property!  Now, tell use the location of the property available for rent.</p>
              </div>      
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card step-card mt-4'>
              <div className="card-body">
                  <h5 className="card-title">3</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Expected Rent</h6>
                  <p className="card-text">Now, tell us how much!  The next step is to provide us with the expected rent amount.</p>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card step-card mt-4'>
              <div className="card-body">
                  <h5 className="card-title">4</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Confirmation Email</h6>
                  <p className="card-text">That's it!  Once you have completed the steps above, you will receive an email confirmation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructions;