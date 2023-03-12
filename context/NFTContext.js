import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressAbi } from './constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState('');
  const nftCurrency = 'ETHs';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Get MetaMask!');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    console.log('currentAccount', { accounts });

    if (accounts.length !== 0) {
      setcurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Get MetaMask!');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setcurrentAccount(accounts[0]);
    window.location.reload();
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  );
};
