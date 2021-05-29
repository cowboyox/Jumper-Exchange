import {ethers} from "ethers";
import erc20_abi from './ABI/ERC_20.json'


const RpcUrls ={
  ETH: process.env.REACT_APP_RPC_URL_MAINNET,
  BSC: process.env.REACT_APP_RPC_URL_BSC,
  POLYGON: process.env.REACT_APP_RPC_URL_POLYGON_MAINNET,
  XDAI: process.env.REACT_APP_RPC_URL_XDAI,
}

const provider =  {
  eth : new ethers.providers.JsonRpcProvider(RpcUrls.ETH),
  bsc: new ethers.providers.JsonRpcProvider(RpcUrls.BSC),
  polygon : new ethers.providers.JsonRpcProvider(RpcUrls.POLYGON),
  xdai: new ethers.providers.JsonRpcProvider(RpcUrls.XDAI),
}

//logic: blockchain -> Token on that chain
const erc20Tokens = {
  eth:{
    bnb:new ethers.Contract('0xb8c77482e45f1f44de1745f52c74426c631bdd52', erc20_abi, provider.eth),
    polygon: new ethers.Contract('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', erc20_abi, provider.eth),
    dai: new ethers.Contract('0x6b175474e89094c44da98b954eedeac495271d0f', erc20_abi, provider.eth) 
  },
  bsc:{
    eth: new ethers.Contract('0x2170ed0880ac9a755fd29b2688956bd959f933f8', erc20_abi, provider.bsc),
    bnb:new ethers.Contract('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', erc20_abi, provider.bsc), // https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    polygon: new ethers.Contract('0xa90cb47c72f2c7e4411e781772735d9317d08dd4', erc20_abi, provider.bsc), // https://bscscan.com/token/...
    dai: new ethers.Contract('0x1dc56f2705ff2983f31fb5964cc3e19749a7cba7', erc20_abi, provider.bsc) // https://bscscan.com/token/...
  },
  polygon:{
    bnb:new ethers.Contract('0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F', erc20_abi, provider.polygon), // https://explorer-mainnet.maticvigil.com/address/...
    polygon: new ethers.Contract('0x0000000000000000000000000000000000001010', erc20_abi, provider.polygon),
    dai: new ethers.Contract('0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', erc20_abi, provider.polygon) 
  },
  xdai:{
    bnb:new ethers.Contract('0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04', erc20_abi, provider.xdai), // https://blockscout.com/xdai/mainnet/address/...
    polygon: new ethers.Contract('0x7122d7661c4564b7C6Cd4878B06766489a6028A2', erc20_abi, provider.xdai),
    dai: new ethers.Contract('0x44fA8E6f47987339850636F88629646662444217', erc20_abi, provider.xdai) 
  },

}


async function getEthAcrossChains(wallet: string){
  return new Promise(async (resolve, reject) =>  {

    const onEth = await provider.eth.getBalance(wallet);
    const onBsc = await erc20Tokens.bsc.eth.balanceOf(wallet);
    // const onPolygon = await erc20Tokens.polygon.eth.balanceOf(wallet);
    // const onXdai = await provider.xdai.getBalance(wallet); // TODO: change

    const ethBalances = {
      onEth : parseFloat(ethers.utils.formatEther(onEth)),
      onBsc : parseFloat(ethers.utils.formatEther(onBsc)),
      onPolygon : 0, //parseFloat(ethers.utils.formatEther(onPolygon)),
      onXdai : 0, //parseFloat(ethers.utils.formatEther(onXdai)),
    }

    console.table({"Eth Amount": ethBalances});
    resolve (ethBalances)
  })
}

async function getDaiAcrossChains(wallet: string){
  return new Promise(async (resolve, reject) =>  {

    const onEth = await erc20Tokens.eth.dai.balanceOf(wallet);
    const onBsc = await erc20Tokens.bsc.dai.balanceOf(wallet);
    const onPolygon = await erc20Tokens.polygon.dai.balanceOf(wallet);
    const onXdai = await provider.xdai.getBalance(wallet); // moved

    const daiBalances = {
      onEth : parseFloat(ethers.utils.formatEther(onEth)),
      onBsc : parseFloat(ethers.utils.formatEther(onBsc)),
      onPolygon : parseFloat(ethers.utils.formatEther(onPolygon)),
      onXdai : parseFloat(ethers.utils.formatEther(onXdai)),
    }

    console.table({"Dai Amount": daiBalances});    
    resolve (daiBalances)
  })
}

async function getPolygonAcrossChains(wallet: string){
  return new Promise(async (resolve, reject) =>  {

    const onEth = await erc20Tokens.eth.polygon.balanceOf(wallet);
    const onBsc = await erc20Tokens.bsc.polygon.balanceOf(wallet);
    const onPolygon =  await provider.polygon.getBalance(wallet); // moved
    const onXdai = await erc20Tokens.xdai.polygon.balanceOf(wallet);

    const polygonBalances = {
      onEth : parseFloat(ethers.utils.formatEther(onEth)),
      onBsc : parseFloat(ethers.utils.formatEther(onBsc)),
      onPolygon : parseFloat(ethers.utils.formatEther(onPolygon)),
      onXdai : parseFloat(ethers.utils.formatEther(onXdai)),
    }

    console.table({"Polygon Amount": polygonBalances});    
    resolve (polygonBalances)
  })
}

async function getBNBAcrossChains(wallet: string){
  return new Promise(async (resolve, reject) =>  {

    const onEth = await erc20Tokens.eth.bnb.balanceOf(wallet);
    const onBsc = await provider.bsc.getBalance(wallet); // moved
    const onPolygon = await erc20Tokens.polygon.bnb.balanceOf(wallet);
    const onXdai = await erc20Tokens.xdai.bnb.balanceOf(wallet);

    const bnbBalances = {
      onEth : parseFloat(ethers.utils.formatEther(onEth)),
      onBsc : parseFloat(ethers.utils.formatEther(onBsc)),
      onPolygon : parseFloat(ethers.utils.formatEther(onPolygon)),
      onXdai : parseFloat(ethers.utils.formatEther(onXdai)),
    }

    console.table({"BNB Amount": bnbBalances});    
    resolve (bnbBalances)
  })
}






export {getEthAcrossChains, getBNBAcrossChains, getDaiAcrossChains, getPolygonAcrossChains}


