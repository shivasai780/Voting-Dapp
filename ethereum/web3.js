import Web3 from "web3";

let web3;
if(typeof window !== "undefined" && window.web3 !== "undefined"){
    //we are in the brower and metamask is running
    web3=new Web3(window.ethereum);
    window.ethereum.enable();
}else{
    //we are on the browser or the user is not running metamast
    const provider =new Web3.providers.HttpProvider(
       'https://rinkeby.infura.io/v3/51223dfaae564927b29e609d0705fa12' 
    );
    web3 = new Web3(provider);

}
export default  web3