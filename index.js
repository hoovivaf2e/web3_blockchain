const Web3 = require('web3');
const json = require("contracts/SimpleStorage.json");
// connect to ethereum node
const ethereumUri = 'http://localhost:8545';

const web3 = new Web3(ethereumUri);
const contAddress;

async function getBlockchainData() {
    //取得現在區塊數
    const num = web3.eth.getBlockNumber();
    console.log(num);
    // 取得某一帳戶的餘額
    web3.eth.getBalance('account_address').then(console.log);
    // 取得某一區塊的資訊
    web3.eth.getBlock(num).then(console.log);
    // 新增帳戶
    web3.eth.accounts.create();
    // unlock account: second
    web3.eth.personal.unlockAccount("account_address", "account_password", 600).then(console.log('Account unlocked!'));

}

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    const myContract = await new web3.eth.Contract(json.abi)
    await myContract.deploy({
        data: json.bytecode
    })
    .send({
        from: accounts[0],
        gas: 1500000,
        gasPrice: '30000000000000'
    })
    .then(function(newContractInstance){
        contAddress = newContractInstance.options.address
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
}

async function callMethods() {
    const accounts = await web3.eth.getAccounts();
    const contAddress = 'account_address'
    const myContract = await new web3.eth.Contract(json.abi, contAddress, {from: accounts[0]})

    result = await myContract.methods.set(unit_parameter).send({from: accounts[0]});
    console.log('result  ' + result);

    result1 = await myContract.methods.get().call();
    console.log('result1 ' + result1);
}

function run() {
    getBlockchainData();
    // deploy();
    callMethods();
}

run();

