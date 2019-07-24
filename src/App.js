import React, { Component } from 'react';
import cover from './images/cover.jpg';
import './App.css';
import getWeb3 from './utils/getWeb3.js';
import {Container,Row,Col} from 'react-bootstrap';
import TeamA from './TeamA.jsx';
import TeamB from './TeamB.jsx';
import TeamC from './TeamC.jsx';
import TeamD from './TeamD.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {
      web3 : '',
      address: '',
    };
  }

componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        this.setState({
          address: acc[0],
          web3: results.web3
        })
      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }
render() {
    return (
      <div className="App">

        <Container>
          <div class="jumbotron">
            <img src={cover} alt="Sports-Beth" />
          </div>
        </Container>
        <Container>
          <div class="jumbotron">
            <h2>Welcome to our Ethereum Sports predictions platform</h2>
            <h4><hr/>Your Wallet address is {this.state.address}</h4>
          </div>
        </Container>

        <Container>
          <div class="jumbotron">
            <Row>
              {/* we define the two columns. The bootstrap grid is divided by 12
              parts so if we want two columns, they will take 6 parts each */}
              <Col xs={4} sm={4}><TeamA /> {/*We will import Team A component here */}</Col>
              <Col xs={4} sm={4} className="App-logo"><h1><br/>VS</h1></Col>
              <Col xs={4} sm={4}><TeamB /> {/*We will import Team B component here */}</Col>
            </Row>
          </div>
          <div class="jumbotron">
            <Row>
              {/* we define the two columns. The bootstrap grid is divided by 12
              parts so if we want two columns, they will take 6 parts each */}
              <Col xs={4} sm={4}><TeamC /> {/*We will import Team A component here */}</Col>
              <Col xs={4} sm={4} className="App-logo"><h1><br/>VS</h1></Col>
              <Col xs={4} sm={4}><TeamD /> {/*We will import Team B component here */}</Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default App;