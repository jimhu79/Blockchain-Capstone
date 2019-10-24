# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product.

# Install and Development

1. `npm install`
2. To run ganache (the mnemonic is used for testing only; a different one is included in truffle-config for rinkeby deployment):
`ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"`
3. Go to eth-contracts folder: `truffle compile`
4. `truffle test test/<test file>`

# Zokrates
1. To run zokrates on windows machine, use windows cmd prompt and run the command: docker run -v "/c/users/jimhu/google drive/blockchain nanodegree/blockchain-capstone/zokrates/code":/home/zokrates/code -ti zokrates/zokrates /bin/bash
2. If the square folder does not show or the command does not work, go to docker settings and reset credentials.
3. cd code/square
4. ~/zokrates compile -i square.code
5. ~/zokrates setup
6. ~/zokrates compute-witness -a <a> <b>; replace a and b with two integers
7. ~/zokrates generate-proof
8. ~/zokrates export-verifier

# Rinkeby deployment

1. Login/create infura account to obtain Rinkeby endpoint
2. Run "ganache-cli":
`ganache-cli -m "drip night ozone glance monster sudden assault smile like spirit salute awful"``
3. Update the truffle-config.js file to include the Rinkeby network:
        var HDWalletProvider = require("truffle-hdwallet-provider");
        var mnemonic = <obtain from ganache>;
        module.exports = {
          networks: {
            rinkeby: {
              provider: function() {
               return new HDWalletProvider(mnemonic, "<infura rinkeby endpoint>");
              },
              network_id: 4,
              gas: 4500000,
            }
          };
        };
4. Delete the build folder; it can cause problems with the deployment
5. truffle compile
6. truffle migrate --network rinkeby --reset
7. Get account[0] from ganache and import the private key into Metamask. Etherscan of deployment:
    https://rinkeby.etherscan.io/address/0x385aaaf5f9e8c5aedf57e89a02eb57b2455edacd

# Rinkeby Deployment output:
Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 0x6ade43


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x9830d3f1b768ebb89c0713a94b5cf551259c7ac0a0860b20d5d1226ed5a108ba
- Blocks: 0            Seconds: 0
   > Blocks: 1            Seconds: 4
   > contract address:    0xAc0fD576F58E043De4691f30d06bc5B38BaB3041
   > block number:        5315695
   > block timestamp:     1571874536
   > account:             0x385aAaF5F9E8c5aedF57E89A02EB57b2455edaCD
   > balance:             17.870114165
   > gas used:            261393
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00522786 ETH


- Saving migration to chain.
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00522786 ETH


2_deploy_contracts.js
=====================

   Replacing 'Verifier'
   --------------------
   > transaction hash:    0x10287c06d992a75d843d70909b432c67a636001d303089032fbb8180f8cd7b82
- Blocks: 0            Seconds: 0
   > Blocks: 0            Seconds: 8
   > contract address:    0x1F69E4046E8579d8Cc3e9BE6430152D8f5965200
   > block number:        5315697
   > block timestamp:     1571874566
   > account:             0x385aAaF5F9E8c5aedF57E89A02EB57b2455edaCD
   > balance:             17.845003165
   > gas used:            1213527
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02427054 ETH


   Replacing 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x648ebb3e4fe8af1ed1dce35a9fc158e0a8553095290dfce67e63225fe3e3e3a3
- Blocks: 0            Seconds: 0
   > Blocks: 0            Seconds: 13
   > contract address:    0xA2e8851E2fBA8d930E2889e1D77b77ADdf1C874F
   > block number:        5315698
   > block timestamp:     1571874581
   > account:             0x385aAaF5F9E8c5aedF57E89A02EB57b2455edaCD
   > balance:             17.735265765
   > gas used:            5486870
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.1097374 ETH


   Replacing 'CustomERC721Token'
   -----------------------------
   > transaction hash:    0xf0f0e423bde20b443e7f5288faec0b0bebeafbfb2a67c8c4e50fce6a9eb79557
- Blocks: 0            Seconds: 0
   > Blocks: 0            Seconds: 12
   > contract address:    0x7719Dcb88796b48C1dd452E274B36bB532D47E96
   > block number:        5315699
   > block timestamp:     1571874596
   > account:             0x385aAaF5F9E8c5aedF57E89A02EB57b2455edaCD
   > balance:             17.664212685
   > gas used:            3552654
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.07105308 ETH


- Saving migration to chain.
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.20506102 ETH


# Minted Tokens on Rinkeby
1. Update mint.js with the deployed contract address for SolnSquareVerifier
2. Execute `node mint.js`
3. The following tokens were minted and can be viewed on etherscan (https://rinkeby.etherscan.io/address/0x385aaaf5f9e8c5aedf57e89a02eb57b2455edacd):
Minted token 1. Transaction 0xb917576f867bf476aaa44292bb45e84dee2779b9e954f5470b2244e87b5109b5
Minted token 2. Transaction 0xcb3d73cffbf2aec5376cd18c0bdd86a40c0338630a3d68f0ed7fdad41aacd8c8
Minted token 3. Transaction 0x297c8ff2824233c6444bdb46fc3c55fcc325afc7e727c6c513d168d9fd958de6
Minted token 4. Transaction 0xa8e69a8ffafd16dcc238cc070cad781c1ce96d7a0b02ee8e2b8867d68bae5ea2
Minted token 5. Transaction 0x96f006f39797e9cad130139f9a0755060e3c007a9a14bdd5a9620216e4d1fb26
Minted token 6. Transaction 0x5ae8aac711294ba1f2c59a8ee9d0d72bb7794f815ae509496816e1fb601557d8
Minted token 7. Transaction 0x6eeae06dbec5bcc778fed8ff35dda28fedcb9197a01b4117e016dbca036b9f6d
Minted token 8. Transaction 0x3cc5f0079b1dfb31cd1713fe71ba6628e48dc6fd209ff7da4e27ce0c60dd341d
Minted token 9. Transaction 0x5a796d33c5bd93d99b5478636310cd57126e25f8131e33853e0d2e31bc78fbbf
Minted token 10. Transaction 0xc18ba91c28949e9f20b1c97adaeb92ef7085d85eedd8d35ce75486181f5ec059

# OpenSea
1. View on OpenSea: https://rinkeby.opensea.io/assets/0xA2e8851E2fBA8d930E2889e1D77b77ADdf1C874F/1
Replace the last value with token ids 1-10.
2. Storefront: https://rinkeby.opensea.io/assets/unidentified-contract-507
3. Sign into OpenSea with account that owns the titles to list for sale.
4. Sell transaction is available here for the "Floating House": https://rinkeby.etherscan.io/tx/0x6ad739d15e90a9d8be5fd470f94702dee070a837bad57a565ebdd6b0ae4e63d2
5. Purchase transaction for the "Floating House" is available here: https://rinkeby.etherscan.io/tx/0xa82f7c84e38454696b0a57771f15d7bb846b1a725f52560c9d51c336bded7565

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
