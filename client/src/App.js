import React, { Component } from 'react';
import LeadGenerator from './containers/LeadGenerator/LeadGenerator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowCircleRight);
library.add(faCheckCircle);

class App extends Component {
  render() {
    return (
      <div className="container">
        <LeadGenerator />
      </div>
    );
  }
}

export default App;
