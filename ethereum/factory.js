import web3 from './web3';
import PoolFactory from './build/PoolFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(PoolFactory.interface),
  '0xd3beF35C00DDF3b3F830832A71940E50d147578E'
);

export default instance;
