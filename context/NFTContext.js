import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressAbi } from './constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const nftCurrency = 'ETHs';

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};
