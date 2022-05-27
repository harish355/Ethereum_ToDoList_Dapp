import React, { Component, useEffect,useState } from "react";
import ToDoList from "./contracts/ToDoList.json";
import getWeb3 from "./getWeb3";
import Homepage from "./componets/todolist";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App()
{
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  const [storageValue,setStorageValue]=useState(0);
  const [web3,setWeb3]=useState(null);
  const [accounts,setAccounts]=useState(null);
  const [contract,setContract]=useState(null);

  useEffect(async()=>{
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    try {
      const web3_js = await getWeb3();
      setWeb3(web3_js);
      const User_account = await web3_js.eth.getAccounts();
      const networkId = await web3_js.eth.net.getId();
      const deployedNetwork = ToDoList.networks[networkId];
      const instance = await new web3_js.eth.Contract(
        ToDoList.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance)
      setAccounts(User_account)
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  },[])


  

  return (
    
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage web3={web3} accounts={accounts} contract={contract} />} />
    </Routes>
  </BrowserRouter>

  );

}

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

export default App;
