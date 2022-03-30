import web3 from "./web3";
import Pool from "./build/Pool.json";

const pool = (address) => {
  return new web3.eth.Contract(JSON.parse(Pool.interface), address);
};
export default pool;
