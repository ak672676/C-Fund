import web3 from './web3';
import PoolFactory from './build/PoolFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(PoolFactory.interface),
  '0x69165486Fc1bC1d92607fC66e33dba4B298667F2'
);

export default instance;
