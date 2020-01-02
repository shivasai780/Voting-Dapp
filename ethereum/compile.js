const solc=require("solc");
const path=require("path");
const fs=require("fs-extra");
const buildpath=path.resolve(__dirname,'build');
fs.removeSync(buildpath);
const lotterypath=path.resolve(__dirname,"contracts","Ballot.sol");
const source=fs.readFileSync(lotterypath,"utf8");
const output=solc.compile(source,1).contracts[":Ballot"];
console.log(output);

fs.ensureDirSync(buildpath);
fs.outputJsonSync(
        
    path.resolve(buildpath, "Ballot.json" ),
    output
);

module.exports=output ;

