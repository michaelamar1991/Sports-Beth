// eslint-disable-next-line no-undef
var Betting = artifacts.require("./Betting.sol");
var Betting2 = artifacts.require("./Betting2.sol");


module.exports = function(deployer) {
  deployer.deploy(Betting2);
  deployer.deploy(Betting);
  };