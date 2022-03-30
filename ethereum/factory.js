import web3 from './web3';
import PoolFactory from './build/PoolFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(PoolFactory.interface),
  '0x83E14CE1cDC0bF07695c4a3e231c665F1c8c95f3'
);

export default instance;
