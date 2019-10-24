//import SolnSquareVerifier from "./eth-contracts/build/contracts/SolnSquareVerifier.json";

const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = "drip night ozone glance monster sudden assault smile like spirit salute awful"
const INFURA_KEY = "f368aea6864c450f8521279a1f596a52"
const OWNER_ADDRESS = "0x385aAaF5F9E8c5aedF57E89A02EB57b2455edaCD"
const NETWORK = "rinkeby"
const proof1 = require('./zokrates/code/square/proof1.json');
const proof2 = require('./zokrates/code/square/proof2.json');
const proof3 = require('./zokrates/code/square/proof3.json');
const proof4 = require('./zokrates/code/square/proof4.json');
const proof5 = require('./zokrates/code/square/proof5.json');
const proof6 = require('./zokrates/code/square/proof6.json');
const proof7 = require('./zokrates/code/square/proof7.json');
const proof8 = require('./zokrates/code/square/proof8.json');
const proof9 = require('./zokrates/code/square/proof9.json');
const proof10 = require('./zokrates/code/square/proof10.json');
const solnSquareVerifier = require("./eth-contracts/build/contracts/SolnSquareVerifier.json");
//update this contract address whenever the SolnSquareVerifier contract is redeployed
const CONTRACT_ADDRESS = "0xA2e8851E2fBA8d930E2889e1D77b77ADdf1C874F"

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    const verifier = new web3Instance.eth.Contract(solnSquareVerifier.abi, CONTRACT_ADDRESS, {gasLimit: "1000000"})
    var proof = proof1;
    for (var i=1; i<=10; i++) {
        let tokenURI = ""; //leave blank this is not used
        switch (i) {
            case 1:
                proof = proof1;
                break;
            case 2:
                proof = proof2;
                break;
            case 3:
                proof = proof3;
                break;
            case 4:
                proof = proof4;
                break;
            case 5:
                proof = proof5;
                break;
            case 6:
                proof = proof6;
                break;
            case 7:
                proof = proof7;
                break;
            case 8:
                proof = proof8;
                break;
            case 9:
                proof = proof9;
                break;
            default:
                proof = proof10;
                break;
        }
        try {
            await verifier.methods.addSolution(OWNER_ADDRESS, i, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs).send({from: OWNER_ADDRESS});
            const result = await verifier.methods.mint(OWNER_ADDRESS, i, tokenURI, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs).send({from: OWNER_ADDRESS});
            console.log("Minted token " + i + ". Transaction " + result.transactionHash);
        }
        catch(e) {
            console.log("Error occured minting token "+i);
        }
    }

    console.log('mint complete');
}

main()
