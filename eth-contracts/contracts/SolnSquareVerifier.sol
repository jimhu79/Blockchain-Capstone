pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import '../../zokrates/code/square/verifier.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    SquareVerifier private verifierContract;

    constructor() public
    {
        verifierContract = new SquareVerifier();
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address tokenAddress;
    }

    // TODO define a mapping to store unique solutions submitted; solution hash key to solution struct mapping
    mapping(bytes32 => Solution) private addedSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 solutionKey);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address to,
                        uint256 tokenId,
                        uint[2] memory a,
                        uint[2][2] memory b,
                        uint[2] memory c,
                        uint[2] memory input) public {
        bytes32 key = keccak256(abi.encodePacked(a,b,c,input));
        require(doesExist(key)==false,"Solution already added.");

        addedSolutions[key] = Solution({tokenId: tokenId, tokenAddress: to});
        emit SolutionAdded(key);
    }

    function doesExist(bytes32 key)
        private
        view
        returns(bool)
    {
        bool _result = true;
        if (addedSolutions[key].tokenAddress == address(0)) {
            _result = false;
        }
        return _result;
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mint(address to,
			     uint256 tokenId,
                 string memory tokenURI,
                 uint[2] memory a,
                 uint[2][2] memory b,
                 uint[2] memory c,
                 uint[2] memory inputs)
                 public
                 returns(bool)
    {
        bytes32 key = keccak256(abi.encodePacked(a,b,c,inputs));
        require(addedSolutions[key].tokenAddress == to, "Provided solution to mint does not match previously added solution.");

        bool isMinted = false;
        if (verifierContract.verifyTx(a,b,c,inputs) == true) {
            isMinted = super.mint(to, tokenId, tokenURI);
        }
        return isMinted;
    }

}
