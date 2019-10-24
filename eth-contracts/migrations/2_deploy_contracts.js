// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier");
var CustomERC721Token = artifacts.require("./CustomERC721Token");

module.exports = function(deployer) {
  //deployer.deploy(SolnSquareVerifier, "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "REProj", "RE");
  deployer.deploy(Verifier);
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(CustomERC721Token);
};
