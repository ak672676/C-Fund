const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/PoolFactory.json');

const provider = new HDWalletProvider(
  'sound danger vehicle borrow animal frost begin song subject spoil define arch',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/752856336ac540ef974a1676b2468790'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '10000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

// 0x83E14CE1cDC0bF07695c4a3e231c665F1c8c95f3
// 0xD001F6d5B2aB9C9b4b0Fa2d129120dF2407D313C