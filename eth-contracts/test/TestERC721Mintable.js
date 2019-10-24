var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0]; //    (0) 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
    const account_two = accounts[1]; //    (1) 0xf17f52151EbEF6C7334FAD080c5704D77216b732
    const account_three = accounts[2]; //   (2) 0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef

    //(3) 0x821aEa9a577a9b44299B9c15c88cf3087F3b5544 (100 ETH)
    //(4) 0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2 (100 ETH)
    //(5) 0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e (100 ETH)
    //(6) 0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5 (100 ETH)
    //(7) 0x0F4F2Ac550A1b4e2280d04c21cEa7EBD822934b5 (100 ETH)
    //(8) 0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc (100 ETH)
    //(9) 0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE (100 ETH)

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1, "");
            await this.contract.mint(account_one, 2, "");
            await this.contract.mint(account_two, 3, "");
            await this.contract.mint(account_two, 4, "");
        })

        it('should return total supply', async function () {
            let supply = await this.contract.totalSupply.call();
            assert.equal(supply, 4, "Totaly supply did not match.");
        })

        it('should get token balance', async function () {
            let owner1Balance = await this.contract.balanceOf.call(account_one);
            let owner2Balance = await this.contract.balanceOf.call(account_two);
            assert.equal(owner1Balance, 2, "Owner 1 balance did not match");
            assert.equal(owner2Balance, 2, "Owner 2 balance did not match");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let token1URI = await this.contract.tokenURI.call(1);
            let token2URI = await this.contract.tokenURI.call(2);
            let token3URI = await this.contract.tokenURI.call(3);
            let token4URI = await this.contract.tokenURI.call(4);
            assert.equal(token1URI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "'Token 1 URI did not match");
            assert.equal(token2URI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2", "'Token 2 URI did not match");
            assert.equal(token3URI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3", "'Token 3 URI did not match");
            assert.equal(token4URI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/4", "'Token 4 URI did not match");
        })

        it('should transfer token from one owner to another', async function () {
            //Verify only the owner of the token can transfer
            let transferDenied = false;
            try {
                await this.contract.transferFrom(account_one, account_three, 3, {from: account_one});
            }
            catch(e) {
                transferDenied = true;
            }
            assert.equal(transferDenied, true, "Transfer not restricted to owner");
            assert.equal(await this.contract.ownerOf(3),account_two,"Token owner is not correct after invalid transfer");

            //Verify approved address can transfer
            transferDenied = false;
            try {
                await this.contract.approve(account_one, 3, {from: account_two});
                await this.contract.transferFrom(account_two, account_three, 3, {from: account_one});
            }
            catch(e) {
                transferDenied = true;
            }
            assert.equal(transferDenied, false, "Approved address was not able to transfer");
            assert.equal(await this.contract.ownerOf(3),account_three,"Token owner is not correct after transfer");

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let mintFailed = false;
            try {
                await this.contract.mint(account_one, 5, "{\"name\":\"token5\"}", {from: account_two});
            }
            catch(e) {
                mintFailed = true;
            }
            assert.equal(mintFailed, true, "Mint is not restricted to contract owner");
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "Contract owner is incorrect");
        })

    });
})
