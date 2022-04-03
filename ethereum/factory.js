import web3 from './web3';
import PoolFactory from './build/PoolFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(PoolFactory.interface),
  '0xD001F6d5B2aB9C9b4b0Fa2d129120dF2407D313C'
);

export default instance;
