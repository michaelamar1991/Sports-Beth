import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/Betting2.json';
import './App.css';
import ManchesterUnited from './images/ManchesterUnited.png';



class TeamC extends Component {
  constructor(){
    super();
    this.state={
      web3: '',
      Amount: '',
      InputAmount: '',
      weiConversion : 1000000000000000000
    }

    this.getAmount = this.getAmount.bind(this);
    this.Bet = this.Bet.bind(this);
    this.MakeWin = this.MakeWin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        this.setState({
          web3: results.web3
        })
      });
      //At the end of the first promise, we return the loaded web3
      return results.web3
    }).then(results => {
      //In the next promise, we pass web3 (in results) to the getAmount function
      this.getAmount(results)
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }

  getAmount(web3){
    //Get the contract
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(web3.currentProvider);
    var BettingInstance;
    web3.eth.getAccounts((error, accounts) => {
    Betting.deployed().then((instance) => {

      //Instantiate the contract in a promise
      BettingInstance = instance

    }).then((result) => {
      //Calling the AmountOne function of the smart-contract
      return BettingInstance.AmountOne.call({from: accounts[0]})
    }).then((result) => {
      //Then the value returned is stored in the Amount state var.
      //Divided by 10000 to convert in ether.
      this.setState({
        Amount : result / 1000000000000000000
      })
    });
  })
  }

  handleInputChange(e) {
    this.setState({InputAmount: e.target.value*this.state.weiConversion});
  }

  Bet(){
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
          BettingInstance = instance
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return BettingInstance.bet(1, {from: accounts[0],
          value: this.state.InputAmount})
        }).catch(() => {
          console.log("Error with betting")
        })
      })
  }

  MakeWin(){
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
          BettingInstance = instance
        }).then((result) => {
          return BettingInstance.distributePrizes(1, {from: accounts[0]})
        }).catch(() => {
          console.log("Error with distributing prizes")
        })
      })
  }


  render(){
        return(
          <div>
            <img src={ManchesterUnited} alt="Manchester United FC" height="100" width="100" className="Team-logo"/>
            <h3>Manchester United FC</h3>
            {console.log(this.state)}
            <h4> Total amount : {this.state.Amount} ETH</h4>
            <hr/>
            <h5> Enter an amount to bet</h5>
            <div className="input-group">
                    <input type="text" className="form-control" onChange={this.handleInputChange} required pattern="[0-9]*[.,][0-9]*"/>
                    <span className="input-group-addon">ETH</span>
            </div>
            <br/>
            <button onClick={this.Bet}>Bet</button>
            <br/>
            <hr/>
            <button onClick={this.MakeWin}> Make this team win</button>
          </div>
        )
    }

}

export default TeamC;