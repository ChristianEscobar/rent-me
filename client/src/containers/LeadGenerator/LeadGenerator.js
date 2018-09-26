import React, { Component } from 'react';
import UserPersonalData from '../../components/UserPersonalData/UserPersonalData';
import UserAddress from '../../components/UserAddress/UserAddress';
import Instructions from '../../components/Instructions/Instructions';
import History from '../../components/History/History';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import axios from 'axios';
import RentValuation from '../../components/RentValuation/RentValuation';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import validator from 'validator';
import Confirmation from '../../components/Confirmation/Confirmation';

class LeadGenerator extends Component {
  constructor(props) {
    super(props);
    this.colorMap =  ['#3FC7FA', '#85D262', '#FE8C6A'];  // Used for progress bar
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      rentValuationRange: {low: 0, high: 0},
      rentValuationErrorExists: false,
      rentValuationErrorMessage: '',
      rentValuationLoading: true,
      expectedRent: 0,
      valuationOkDisabled: true,
      emailValid: false,
      phoneValid: false,
      nextForm: 'user_data',
      currentForm: 'user_data',
      address: '',
      addressTerms: [],
      validAddressSelected: false,
      addressSuggestions: [],
      userDataNextDisabled: true,
      userAddressNextDisabled: true,
      userDataFormShow: true,
      userAddressFormShow: false,
      rentValuationShow: false,
      progress: 0,
      progressColor: '#3FC7FA',
      stepTransform: 15,
      completed: false,
      history: [],
      animateHistory: false,
      autoSuggestErrorMsg: '',
    }
  };

  componentDidMount() {
    this.setState({
      history: JSON.parse(localStorage.getItem('history')) || []
    });
  };

  // onChange handler for UserPersonalData
  personalDataOnChangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // Validate the user's email from the UserPersonalData component
  validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      this.setState({
        emailValid: false
      }, this.enableUserDataNextButton);
      return `${value} is not a valid email.`
    } else {
      this.setState({
        emailValid: true
      }, this.enableUserDataNextButton);
    }
  };

  // Validate the user's phone from the UserPersonalData component
  validatePhone = (value) => {
    if(!validator.isMobilePhone(value, ['en-US'])) {
      this.setState({
        phoneValid: false
      }, this.enableUserDataNextButton);
      return `${value} is not a valid phone number.`
    } else {
      this.setState({
        phoneValid: true
      }, this.enableUserDataNextButton);
    }
  };

  // Enable or disable the next button in the UserPersonalData
  enableUserDataNextButton = () => {
    if(this.state.emailValid && this.state.phoneValid) {
      this.setState({
        userDataNextDisabled: false
      });
    } else {
      this.setState({
        userDataNextDisabled: true
      });
    }
  };

  // Validate the user's address from the UserAddress component
  validateAddress = () => {
    if(this.state.validAddressSelected) {
      this.setState({
        userAddressNextDisabled: false
      });
    } else {
      this.setState({
        userAddressNextDisabled: true
      });
    }
  };

  // Event handler to load the next form
  nextFormHandler = (event, nextForm, addedProgress) => {
    event.preventDefault();

    let newState = {
      nextForm,
      currentForm: nextForm,
      progress: this.state.progress + addedProgress,
      progressColor: this.colorMap[Math.floor(Math.random() * this.colorMap.length)],
      stepTransform: this.state.stepTransform + 3.5,
    };

    // The below is not pretty, can definetly be done in a different way
    switch(nextForm) {
      case 'user_data':
        newState.userDataFormShow = true;
        newState.userAddressFormShow = false;
        newState.rentValuationShow = false;
        break;
      case 'user_address':
        newState.userDataFormShow = false;
        newState.userAddressFormShow = true;
        newState.rentValuationShow = false;
        newState.rentValuationErrorMessage = '';
        break;
      case 'user_rent':
        newState.userDataFormShow = false;
        newState.userAddressFormShow = false;
        newState.rentValuationShow = true;
        break;
      default:
        // Do nothing at default, maybe throw error?
    }

    this.setState(newState);
  };

  // The functions below are used by the Autosuggest component within the UserAddress component
  suggestionsOnChangeHandler = (event, { newValue, method } ) => {
    const newStateValues = {address: newValue};
    
    if(method === 'type') newStateValues['validAddressSelected'] = false;

    this.setState(newStateValues, this.validateAddress);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    // Only call endpoint if address value is not blank
    if(value.length > 0) {
      axios.get('/api/autocomplete/' + value)
      .then(res => {
        this.setState({
          addressSuggestions: res.data.predictions,
          autoSuggestErrorMsg: ''
        });
      })
      .catch(error => {
        this.setState({
          autoSuggestErrorMsg: 'Unable to retrieve address suggestions.  ' + error
        });
      });
    } 
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      addressSuggestions: [],
    })
  };

  getSuggestionValue = (suggestion) => {
    this.setState({ 
      addressTerms: suggestion.terms,
      validAddressSelected: true
    });
    return suggestion.description;
  };

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.description}</span>
    );
  };
  /* End Autosuggest functions */

  // Call Zillow API for rent valuation
  callZillow = (event, nextForm, addToProgress) => {
    event.preventDefault();

    let address = (this.state.addressTerms.length === 5) ? this.state.addressTerms[0].value +  ' ' + this.state.addressTerms[1].value : this.state.addressTerms[0].value;
    let cityStateZip = (this.state.addressTerms.length === 5) ? this.state.addressTerms[2].value + ', ' + this.state.addressTerms[3].value : this.state.addressTerms[1].value + ', ' + this.state.addressTerms[2].value

    axios.get('/api/rent-zestimate', {params: {
      address,
      cityStateZip
    }})
    .then(res => {
      if(res.data.message.code !== "0") {

        this.setState({
          rentValuationErrorExists: true,
          rentValuationErrorMessage: res.data.message.text,
          rentValuationLoading: false
        });
      } else {
        let newState = {
          rentValuationLoading: false,
          rentValuationRange: { low: 0, high: 0 }
        };
        
        // Set rent zestimate range if it exists
        if(hasOwnProperty.call(res.data.response.results.result[0], 'rentzestimate')) {
          newState.rentValuationRange.low = parseInt(res.data.response.results.result[0].rentzestimate[0].valuationRange[0].low[0]._, 10);
          newState.rentValuationRange.high = parseInt(res.data.response.results.result[0].rentzestimate[0].valuationRange[0].high[0]._, 10);
        } else {
          // No rent zestimate range exists, so let's calculate it using the zestimate
          let zestimate = res.data.response.results.result[0].zestimate[0].amount[0]._;

          // 5% of zestimate
          let fivePercentOfZestimate = (zestimate * 0.05);
          // Take 10% of the 5%
          let tenPercentOfFiveAndZestimate = (fivePercentOfZestimate * 0.10);
          // Subtract the 10% to get the low
          let low = fivePercentOfZestimate - tenPercentOfFiveAndZestimate;
          // Add the 10% to get the high
          let high = fivePercentOfZestimate + tenPercentOfFiveAndZestimate;

          newState.rentValuationRange.low = Math.round(low);
          newState.rentValuationRange.high = Math.round(high);
        }

        this.setState(newState);
      }
    })
    .catch(error => {
      alert('Oh Oh, something went wrong =(!', error);
      console.error(error);
    });

   this.nextFormHandler(event, nextForm, 30);
  };

  // Change handler for expected rent
  expectedRentOnChange = (event) => {
    let disableOkButton = false;

    (event.target.value.length === 0) ? disableOkButton = true : disableOkButton = false;

    this.setState({
      expectedRent: event.target.value,
      valuationOkDisabled: disableOkButton  
    });
  };

  // Write to local storage once user has clicked OK at the rent valuation form
  writeToLocalStorage = () => {
    let storageObj = {
      name: {first: this.state.firstName, last: this.state.lastName},
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      range: {low: this.state.rentValuationRange.low, high: this.state.rentValuationRange.high},
      rent: this.state.expectedRent
    }

    // Write to local storage
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(storageObj);
    localStorage.setItem('history', JSON.stringify(history));

    this.setState({
      history,
      progress: this.state.progress + 40,
      progressColor: this.colorMap[parseInt(Math.random() * 3, 10)],
      completed: true,
      animateHistory: true
    });

    // Send email
    axios.post('/api/send-email', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      range: this.state.rentValuationRange,
      rent: this.state.expectedRent
    })
    .then(res => {
      //console.log(res);
    })
    .catch(error => {
      alert('Oh Oh, something went wrong =(!', error);
      console.error(error);
    })
  };

  // Used to reset state for new entry
  // Not the best way but it works for now
  resetState() {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      rentValuationRange: {low: 0, high: 0},
      rentValuationErrorExists: false,
      rentValuationErrorMessage: '',
      rentValuationLoading: true,
      expectedRent: 0,
      valuationOkDisabled: true,
      emailValid: false,
      phoneValid: false,
      nextForm: 'user_data',
      currentForm: 'user_data',
      address: '',
      addressTerms: [],
      validAddressSelected: false,
      addressSuggestions: [],
      userDataNextDisabled: true,
      userAddressNextDisabled: true,
      userDataFormShow: true,
      userAddressFormShow: false,
      rentValuationShow: false,
      progress: 0,
      progressColor: '#3FC7FA',
      stepTransform: 15,
      completed: false,
      animateHistory: false,
      autoSuggestErrorMsg: '',
    });
  };

  closeModal = () => {
    this.resetState();
  }

  render() {
    const windowWidth = window.innerWidth; // Used to change order of components

    const modalConfirmation = 
      <Modal show={this.state.completed} modalClosed={this.closeModal}>
        <Aux>
          <Confirmation firstName={this.state.firstName} email={this.state.email} modalClick={this.closeModal} />
        </Aux>
      </Modal>

    const instructions = <Instructions />

    const history = 
      <History history={this.state.history}
        animate={this.state.animateHistory}/>

    const progressBar = 
      <ProgressBar 
        percentComplete={this.state.progress} 
        progressColor={this.state.progressColor} 
        currentForm={this.state.currentForm}
        stepTransform={this.state.stepTransform}/>

    /*
    const instructionsAndHistory = 
      <div className='card-deck'>
        <Instructions />
        <History history={this.state.history}
            animate={this.state.animateHistory}/>
      </div>*/

    /*
    const progressBar = 
      <div className='card mt-4 border-white card-shadow'>
        <div className='card-body'>
          <ProgressBar 
            percentComplete={this.state.progress} 
            progressColor={this.state.progressColor} 
            currentForm={this.state.currentForm}
            stepTransform={this.state.stepTransform}/>
        </div>
      </div>*/

    const dataCollection = 
      <Aux>
        <UserPersonalData firstName={this.state.firstName} 
        lastName={this.state.lastName} 
        email={this.state.email} 
        phone={this.state.phone} 
        changeHandler={this.personalDataOnChangeHandler} 
        nextHandler={this.nextFormHandler}
        nextButtonDisabled={this.state.userDataNextDisabled}
        emailValidator={this.validateEmail}
        phoneValidator={this.validatePhone}
        show={this.state.userDataFormShow}/>

      <UserAddress 
        address={this.state.address}
        addressSuggestions={this.state.addressSuggestions}
        onChange={this.suggestionsOnChangeHandler}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} 
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        nextHandler={this.callZillow}
        nextButtonDisabled={this.state.userAddressNextDisabled}
        show={this.state.userAddressFormShow}
        autoSuggestError={this.state.autoSuggestErrorMsg}/>

      <RentValuation lowRange={this.state.rentValuationRange.low} 
        highRange={this.state.rentValuationRange.high}
        address={this.state.address}
        okDisabled={this.state.valuationOkDisabled}
        okClick={this.writeToLocalStorage}
        errorMsg={this.state.rentValuationErrorMessage} 
        expectedRentChange={this.expectedRentOnChange}
        show={this.state.rentValuationShow}
        loading={this.state.rentValuationLoading}
        nextHandler={this.nextFormHandler}/> 
    </Aux>

    if(windowWidth > 768) {
      return (
        <Aux>
          {modalConfirmation}

          <div className='container'>
            <div className='card-deck'>
              { instructions }
              { history }
            </div>
            <div className='card-deck'>
              { dataCollection }
              { progressBar }
            </div>
          </div>
        </Aux>);
    } else {
      return(
        <Aux>
          {modalConfirmation}

          <div className='container'>
            <div className='card-deck'>
              { progressBar }
              { dataCollection }
            </div>
            <div className='card-deck'>
              { history }
              { instructions }
            </div>
          </div>
        </Aux>);
    }
  }
}

export default LeadGenerator;