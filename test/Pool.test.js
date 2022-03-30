const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/PoolFactory.json");
const compiledPool = require("../ethereum/build/Pool.json");

let accounts;
let factory;
let poolAddress;
let pool;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createPool("100", "TITLE", "DESC").send({
    from: accounts[0],
    gas: "1000000",
  });

  [poolAddress] = await factory.methods.getdeployedPools().call();
  pool = await new web3.eth.Contract(
    JSON.parse(compiledPool.interface),
    poolAddress
  );
});

describe("Pool Test", () => {
  it("deploys a factory and a pool", () => {
    assert.ok(factory.options.address);
    assert.ok(pool.options.address);
  });
});
