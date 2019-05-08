import React, { Component } from "react";
import WaitlistContract from "./contracts/Waitlist.json";
import getWeb3 from "./utils/getWeb3";


import "./App.css";

class App extends Component {
  state = { storageValue: 0, message: '',  web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WaitlistContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WaitlistContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Seconds till EndDate
    const response = await contract.methods.Countdown().call({from: accounts[0]});

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  onClick = async () => {

    const { accounts, contract } = this.state;

    this.setState({ message:'Waiting on transaction success...'});

    await contract.methods.SetUserInfo().send({ from: accounts[0] });

    this.setState({ message:'You have been placed on the waitlist'});

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Waitlist Contract</h1>
        <p>Your Truffle Box is installed and ready.</p>

        <hr />

        <h4>Add account to waitlist.</h4>
        <button onClick={this.onClick}>Join</button>

        <hr />

        <div> Countdown: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
