import { ChainKey, ChainPortfolio } from '../types';
import axios from 'axios'
import { ethers } from 'ethers';

type tokenListDebankT = {
  id: string,
  chain: string,
  name: string,
  symbol: string,
  display_symbol: string,
  optimized_symbol: string,
  decimals: number,
  logo_url: string,
  price: number,
  is_verified: boolean,
  is_core: boolean,
  is_wallet: boolean,
  time_at: number,
  amount: number
}


/* INFO: DEBANK API goes against our initial way of looking on all chains for a given coinId;
it looks for all coins for a given chain -> its reversed!!!
*/
async function getCoinsOnChain(walletAdress: string, chainKey: ChainKey){
  walletAdress = walletAdress.toLowerCase()
  const ChainString: string = chainKey.toString()
  const tokenListUrl = `https://openapi.debank.com/v1/user/token_list?id=${walletAdress}&chain_id=${ChainString}&is_all=true`

  var result
  try{
    result = await axios.get(tokenListUrl);
  } catch (e){
    console.warn(`Debank api call for token list on chain ${chainKey} failed with status ` + e)
    console.warn(e)
    return []
  }

  var tokenList: Array<tokenListDebankT>;
  // response body is empty?
  if (Object.keys(result.data).length === 0){
    return [];
  } else{
    tokenList = result.data
  }

  // build return object
  var balanceArray: Array<ChainPortfolio> = []
  for (const token of tokenList){
    balanceArray.push({
      id: token.id,
      name: token.name,
      symbol: token.optimized_symbol,
      img_url: token.logo_url,
      amount: token.amount as number,
      pricePerCoin: token.price as number,
    })
  }

  return balanceArray
}

async function getBalancesForWallet(walletAdress: string){
  walletAdress = walletAdress.toLowerCase()
  const tokenListUrl = `https://openapi.debank.com/v1/user/token_list?id=${walletAdress}&is_all=true`

  var result
  try{
    result = await axios.get(tokenListUrl);
  } catch (e){
    console.warn(`Debank api call for token list failed with status ` + e)
    console.warn(e)
    return {}
  }

  var tokenList: Array<tokenListDebankT>;
  // response body is empty?
  if (Object.keys(result.data).length === 0){
    return {};
  } else{
    tokenList = result.data
  }

  // build return object
  const totalPortfolio : {[ChainKey: string]: Array<ChainPortfolio>} = {
    [ChainKey.ETH] : [],
    [ChainKey.BSC] : [],
    [ChainKey.POL] : [],
    [ChainKey.DAI] : [],
    [ChainKey.OKT] : [],
    [ChainKey.FTM] : [],

  }
  for (const token of tokenList) {
    totalPortfolio[token.chain].push({
      id: ethers.utils.isAddress(token.id) ? token.id : '0x0000000000000000000000000000000000000000',
      name: token.name,
      symbol: token.optimized_symbol,
      img_url: token.logo_url,
      amount: token.amount as number,
      pricePerCoin: token.price as number,
    })
  }

  return totalPortfolio
}

export { getCoinsOnChain , getBalancesForWallet }
