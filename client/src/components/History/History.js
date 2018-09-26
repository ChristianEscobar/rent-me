import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './History.css';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCardClasses: 'card mt-4 card-shadow'
    }
  }

  onAnimationEndHandler = () => {
    this.setState({
      defaultCardClasses: 'card mt-4 card-shadow'
    })
  }

  render() {
    const columns = [{
      Header: 'First Name',
      accessor: 'name.first'
    },{
      Header: 'Last Name',
      accessor: 'name.last'
    },{
      Header: 'Email',
      accessor: 'email'
    },{
      Header: 'Phone',
      accessor: 'phone'
    },{Header: 'Address',
      accessor: 'address'
    },{
      Header: 'Rent Low',
      accessor: 'range.low'
    },{
      Header: 'Rent High',
      accessor: 'range.high'
    },{
      Header: 'Expected Rent',
      accessor: 'rent'
    }];

    const cardBodyStyles = {
      padding: 0,
    };

    const cardHeaderStyles = {
      backgroundColor: '#FF8000',
    }

    let cardClasses = this.props.animate ? this.state.defaultCardClasses + ' animate' : this.state.defaultCardClasses; 

    return (
      <div className={cardClasses} onAnimationEnd={this.onAnimationEndHandler}>
        <div className='card-header' style={cardHeaderStyles}>History</div>
        <div className='card-body' style={cardBodyStyles}>
          <ReactTable data={this.props.history}
            noDataText='No History Found'
            columns={columns}
            defaultPageSize={8}
            className='-striped -highlight'
            showPageSizeOptions={false}/>
        </div>
      </div>
    );
  }
}

export default History;