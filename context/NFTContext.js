
import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressAbi } from './constants';

const projectId = '2Mva4CdjwzbxCk5CRIeWB42jUM4';
const projectSecret = '1ad0f83065d49d9eb99069ea12304ec0';
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  } });

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState('');
  const nftCurrency = 'ETHs';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Get MetaMask!');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

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

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://cw-nft-marketplace.infura-ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log('Error uploading file to IPFS.', error);
    }
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}>
      {children}
    </NFTContext.Provider>
  );
};
