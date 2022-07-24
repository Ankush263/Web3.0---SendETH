import { ethers } from 'ethers';
import ABI from './artifacts/contracts/SendETH.sol/SendETH.json'

import './App.css';
import ethLogo from './images/eth.png';
import React, { useState } from 'react';

function App() {

  const [logedIn, IsLogedIn] = useState(false)    //If logedIn is true, It renders a new page
  const [accountAddress, setAccountAddress] = useState("")    //This stores the Account address which the user typed in
  const [amount, setAmount] = useState(0)   //This stores the value which the user want to send

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const abi = ABI.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  //Connect to the Metamask
  const connect = async () => {

    document.querySelector(".btn").disabled = true

    try{
      if(typeof window.ethereum != "undefined"){
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      IsLogedIn(true)
    }catch(error){
      console.log(error)
    }

  }

  //By this function you can send ether to another account
  const sendEth = async () => {

    const contract = new ethers.Contract(contractAddress, abi, signer)

    try{
      await contract.send(
        accountAddress,
        {value: ethers.utils.parseEther(`${amount}`)}
      )
      setAccountAddress("")
      setAmount(0)
    }catch(error){
      console.log(error)
    }

  }

  return (
    <div className="App">
      <div className="header">
        <img src={ethLogo} alt="ETH" className="logo" />
        <h1 className="header--h1">Send ETH🪙🚀🤑</h1>
      </div>
      <div className="container">
        {!logedIn && <button className="btn" onClick={connect}>Connect Wallet 🪙</button>}
        {logedIn &&
        <div>
          <input type="text" placeholder="Enter Address" className="input" onChange={(e) => setAccountAddress(e.target.value)} value={accountAddress} />
          <input type="number" placeholder="Enter Value" className="input" onChange={(e) => setAmount(e.target.value)} value={amount} />
          <button className="btn" onClick={sendEth}>Send Eth 🤑</button>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
