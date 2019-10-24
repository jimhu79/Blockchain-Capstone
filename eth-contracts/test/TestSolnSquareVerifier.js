let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof1 = require('../../zokrates/code/square/proof1.json');
const proof2 = require('../../zokrates/code/square/proof2.json');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Testing Soln Square Verifier', function () {
        beforeEach(async function () {
            this.contract = await SolnSquareVerifier.new();
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test adding new solution', async function () {
            let isAdded = true;
            try {
                await this.contract.addSolution(account_one, 1, proof1.proof.a, proof1.proof.b, proof1.proof.c, proof1.inputs);
            }
            catch(e) {
                isAdded = false;
            }
            assert.equal(isAdded,true,"Failed to add solution.");

        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test minting of ERC721', async function () {

            let isMinted = false;
            try {
                let proof = proof1;
                await this.contract.addSolution(account_one, 1, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                await this.contract.mint(account_one, 1, "", proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                proof = proof2;
                await this.contract.addSolution(account_one, 2, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                await this.contract.mint(account_one, 2, "", proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
                isMinted = true;
            }
            catch(e) {
                console.log(e);
            }
            if (isMinted) {
                try {
                    let tokenURI = await this.contract.tokenURI(1);
                    console.log(tokenURI);
                    tokenURI = await this.contract.tokenURI(2);
                    console.log(tokenURI);
                }
                catch(e) {
                    console.log(e);
                }
            }
            assert.equal(isMinted,true,"Failed to mint.");

        });

    });

})
