

import web3 from"./web3";
import  Ballot from"./build/Ballot.json";
const instance=new web3.eth.Contract(
    JSON.parse(Ballot.interface),
    "0xfcf778C07EDdEB8B157Ac845d1b34dd402d6994a"
)
console.log( instance);
export default instance;

