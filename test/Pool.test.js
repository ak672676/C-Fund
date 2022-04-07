const assert = require("assert");
const ganache = require("ganache-cli");
const options = { gasLimit: 8000000 };
const Web3 = require("web3");
const web3 = new Web3(ganache.provider(options));

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
    .send({ gas: "8000000", from: accounts[0] });

  await factory.methods.createPool("100", "TITLE", "DESC").send({
    from: accounts[0],
    gas: "8000000",
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

  it("make caller pool owner", async () => {
    const owner = await pool.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  it("allows people to contribute to the pool and mark them as approver", async () => {
    await pool.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await pool.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("check minimum contribution", async () => {
    try {
      await pool.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows owner to make a payment request", async () => {
    await pool.methods
      .createRequest("Buy hardware", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await pool.methods.requests(0).call();

    assert.equal("Buy hardware", request.description);
  });

  it("payment request process", async () => {
    await pool.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await pool.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await pool.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await pool.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });

});
