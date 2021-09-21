const HDWalletProvider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const {interface,bytecode}=require("./compile");
const provider=new HDWalletProvider('Keep your phasphrase',' https://rinkeby.infura.io/v3/51223dfaae564927b29e609d0705fa12'
);
const web3=new Web3(provider);
const deploy=async()=>{
        const accounts=await web3.eth.getAccounts();
        
        const result=await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data:"0x"+bytecode})
                    .send({from:accounts[0]})
        
        console.log("compiled at"+result.options.address);
        console.log(result);

};
deploy();
/*const HDWalletProvider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const{interface,bytecode}=require("./compile");
const provider=new HDWalletProvider('urge firm village vintage clap farm guilt category bracket chef thank machine',' https://rinkeby.infura.io/v3/51223dfaae564927b29e609d0705fa12');
const web3=new Web3(provider);
const deploy=async()=>{
        const accounts=web3.eth.getAccounts();
        const result=await new web3.eth.Contract(JSON.parse(interface))
                     .deploy({data:"0x"+bytecode})
                     .send({from:accounts[0]})
        console.log("compiled at"+result.options.address);
         console.log(result);
}
deploy();
*/
