import { Button, Modal, Dropdown, Divider, Input } from 'semantic-ui-react';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

class App extends Component {
  constructor() {
    super();

    this.handlePurchaseInput = this.handlePurchaseInput.bind( this );
    this.handleAmountInput = this.handleAmountInput.bind( this );
    this.handleChange = this.handleChange.bind( this );

    this.state = {
      startDate: moment(),
      buy: true,
      sell: false,
      currencies: [{
        key: 'btc', value: 'btc', text: 'Bitcoin',
      },
      {
        key: 'ltc', value: 'ltc', text: 'Litecoin',
      },
      {
        key: 'bch', value: 'bch', text: 'Bitecoin Cash',
      },
      ],
    };
  }

  getTestData() {
    return fetch( 'http://localhost:8080/test' )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        this.console.log( responseJson );
      } )
      .catch( ( error ) => {
        this.console.error( error );
      } );
  }

  handlePurchaseInput( event ) {
    if ( !event.target.value.match( /^[+-]?\d+(\.\d+)?$/ ) && event.target.value.length > 0 ) {
      this.setState( {
        purchase_error: true,
      } );
    } else {
      this.setState( {
        purchase_error: false,
      } );
    }
  }

  handleAmountInput( event ) {
    if ( !event.target.value.match( /^[+-]?\d+(\.\d+)?$/ ) && event.target.value.length > 0 ) {
      this.setState( {
        amount_error: true,
      } );
    } else {
      this.setState( {
        amount_error: false,
      } );
    }
  }

  handleBuyState( state ) {
    this.setState( {
      buy: !state,
      sell: false,
    } );
  }

  handleSellState( state ) {
    this.setState( {
      sell: !state,
      buy: false,
    } );
  }

  handleChange( date ) {
    this.setState( {
      startDate: date,
    } );
  }


  render() {
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <br />
        <Modal dimmer="blurring" trigger={<Button>Add Transaction</Button>}>
          <Modal.Content>
            <Modal.Description>

              <Button inverted color="green" active={this.state.buy} onClick={() => this.handleBuyState( this.state.buy )}>Buy</Button>
              <Button inverted color="red" active={this.state.sell} onClick={() => this.handleSellState( this.state.sell )}>Sell</Button>

              <Divider />
              <DatePicker
                class="ui small input"
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
              <Divider />
              <Dropdown placeholder="Select Currency" fluid search selection options={this.state.currencies} />
              <Divider />
              <Input size="small" error={this.state.purchase_error} placeholder="Purchase price.." onChange={this.handlePurchaseInput} />
              <Divider />
              <Input size="small" error={this.state.amount_error} placeholder={this.state.sell ? 'Amount sold' : 'Amount bought'} onChange={this.handleAmountInput} />
              <Divider />

              <Button inverted color={this.state.buy ? 'green' : 'red'} onClick>Add transaction</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
