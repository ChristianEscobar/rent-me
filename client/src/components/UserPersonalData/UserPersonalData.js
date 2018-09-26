import React from 'react';
import NextButton from '../UI/NextButton/NextButton';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';

const UserPersonalData = (props) => {
  
  const cardStyles = {
    transform: props.show ? 'translateX(0)' : 'translateX(-50vh)',
    opacity: props.show ? '1' : '0',
    position: props.show ? 'relative' : 'absolute',
    left: props.show ? '0' : '-50px'
  }

  return (
    <div className='card mt-4 card-shadow form-container' style={cardStyles}>
      <div className='card-body'>
        <Form>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='firstName'>First Name</label>
              <input type='text' className='form-control' id='firstName' placeholder='First Name' value={props.firstName} onChange={props.changeHandler}></input>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='lastName'>Last Name</label>
              <input type='text' className='form-control' id='lastName' placeholder='Last Name' value={props.lastName} onChange={props.changeHandler}></input>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='email'>Email*</label>
              <Input className='form-control' 
                    id='email'
                    name='email' 
                    validations={[props.emailValidator]} 
                    value={props.email} 
                    onChange={props.changeHandler} 
                    placeholder='Email'/>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='phone'>Phone Number*</label>
              <Input type='tel' 
                  className='form-control' 
                  id='phone'
                  name='phone'
                  validations={[props.phoneValidator]} 
                  placeholder='1-(555)-555-5555' 
                  value={props.phone} 
                  onChange={props.changeHandler}/>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <NextButton clickHandler={props.nextHandler} progress={30} disabled={props.nextButtonDisabled} next='user_address'/>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserPersonalData;